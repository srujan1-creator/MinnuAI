#!/usr/bin/env python3
import sys
import time
import os
import random
import sqlite3

# ANSI Escape Sequences for Premium CLI Aesthetics
class Style:
    RESET = "\033[0m"
    BOLD = "\033[1m"
    ITALIC = "\033[3m"
    UNDERLINE = "\033[4m"
    
    # Theme Palette (Teal, Gold, Dark/Light accents)
    GOLD = "\033[38;2;212;175;55m"      # Gold dust
    TEAL = "\033[38;2;0;150;136m"       # Gemma Teal
    COFFEE = "\033[38;2;111;78;55m"     # Coffee Brown
    GREEN = "\033[38;2;76;175;80m"      # Success Green
    RED = "\033[38;2;244;67;54m"        # Alert Red
    CYAN = "\033[38;2;0;188;212m"       # Info Cyan
    GRAY = "\033[38;2;158;158;158m"     # Subtitle Gray
    
    # Backgrounds
    BG_TEAL = "\033[48;2;0;77;64m"
    BG_COFFEE = "\033[48;2;62;39;35m"

class Inventory:
    def __init__(self):
        self.db_path = 'users.db'

    @property
    def stock(self):
        """Dynamically queries database inventory stock."""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('SELECT item, qty FROM inventory')
            rows = cursor.fetchall()
            conn.close()
            if not rows:
                raise Exception("Empty inventory table")
            return {row[0]: row[1] for row in rows}
        except Exception:
            # Fallback for transient testing if DB not yet initialized
            return {
                "water": 2000.0, "milk": 2000.0, "oat_milk": 1000.0, "soy_milk": 1000.0,
                "coffee_beans": 500.0, "lavender_syrup": 200.0, "gold_dust": 20.0, "cups": 50.0
            }

    def check_ingredients(self, required):
        stock = self.stock
        missing = []
        for item, qty in required.items():
            if stock.get(item, 0.0) < qty:
                missing.append(f"{item} (need {qty:.1f}, have {stock.get(item, 0.0):.1f})")
        return missing

    def deplete(self, required):
        try:
            stock = self.stock
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            for item, qty in required.items():
                new_qty = max(0.0, stock.get(item, 0.0) - qty)
                cursor.execute('UPDATE inventory SET qty = ? WHERE item = ?', (new_qty, item))
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"Error updating database stock: {e}")

    def restock(self):
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            default_stock = {
                "water": 2000.0, "milk": 2000.0, "oat_milk": 1000.0, "soy_milk": 1000.0,
                "coffee_beans": 500.0, "lavender_syrup": 200.0, "gold_dust": 20.0, "cups": 50.0
            }
            for item, qty in default_stock.items():
                cursor.execute('UPDATE inventory SET qty = ? WHERE item = ?', (qty, item))
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"Error restocking database: {e}")


class DrinkRecipe:
    def __init__(self, name, base_price, coffee_beans=0, water=0, milk=0, lavender_syrup=0, gold_dust=0):
        self.name = name
        self.base_price = base_price
        # Recipes mapping
        self.recipe = {
            "coffee_beans": coffee_beans,
            "water": water,
            "milk": milk,
            "lavender_syrup": lavender_syrup,
            "gold_dust": gold_dust,
            "cups": 1
        }

class Menu:
    def __init__(self):
        self.drinks = {
            "1": DrinkRecipe("Espresso", 3.00, coffee_beans=15, water=50),
            "2": DrinkRecipe("Americano", 3.50, coffee_beans=15, water=200),
            "3": DrinkRecipe("Latte", 4.50, coffee_beans=15, water=50, milk=150),
            "4": DrinkRecipe("Cappuccino", 4.50, coffee_beans=15, water=50, milk=100),
            "5": DrinkRecipe("Gemma 4", 6.50, coffee_beans=30, water=80, milk=150, lavender_syrup=15, gold_dust=1) # Signature oat-milk based
        }

    def display(self):
        print(f"\n{Style.GOLD}┌────────────────────────────────────────────────────────┐{Style.RESET}")
        print(f"{Style.GOLD}│                   COFFEE HOUSE MENU                    │{Style.RESET}")
        print(f"{Style.GOLD}├────────────────────────────────────────────────────────┤{Style.RESET}")
        for key, drink in self.drinks.items():
            special = f" {Style.TEAL}[Gemma 4 Signature]{Style.GOLD}" if drink.name == "Gemma 4" else ""
            print(f"{Style.GOLD}│ {Style.BOLD}{key}. {drink.name:<15}{Style.RESET}{Style.GOLD} ${drink.base_price:.2f}{special:<34} │")
        print(f"{Style.GOLD}└────────────────────────────────────────────────────────┘{Style.RESET}")

class Gemma4Assistant:
    def __init__(self):
        self.responses = {
            "tired": ("Gemma 4 (Signature)", "Sounds like you need a high-power performance boost! I recommend our signature Gemma 4. Packed with a double-espresso kick, lavender syrup, and literal gold dust to revitalize your day."),
            "sleepy": ("Gemma 4 (Signature)", "Need to awaken your synapses? Our signature Gemma 4 will get you going with a rich double shot of espresso and velvet-smooth oat milk!"),
            "energy": ("Espresso", "Keep it raw and intense. An Espresso is the fastest way to refuel your mental buffer."),
            "sweet": ("Gemma 4 (Signature)", "Craving a delightful flavor profile? The Gemma 4 signature includes lavender syrup for a perfect floral sweetness."),
            "treat": ("Gemma 4 (Signature)", "Treat yourself to luxury! The signature Gemma 4 with premium gold dust is the ultimate indulgence."),
            "sugar": ("Latte", "A classic milk-textured Latte with sugar should satisfy that sweet tooth perfectly."),
            "light": ("Americano", "For a clean, sugar-free, and refreshing option, I highly recommend an Americano."),
            "healthy": ("Americano", "An Americano is low calorie and purely functional. Excellent choice."),
            "simple": ("Espresso", "A simple, strong, single shot of Espresso is pure coffee essence."),
            "creamy": ("Latte", "A smooth, creamy Latte with steamed milk will feel like a warm hug."),
            "smooth": ("Cappuccino", "A velvety Cappuccino with thick microfoam is perfectly balanced and smooth.")
        }

    def consult(self, prompt):
        """Analyzes prompt and returns (recommended_drink_name, assistant_advice)."""
        prompt_lower = prompt.lower()
        for keyword, (drink_name, advice) in self.responses.items():
            if keyword in prompt_lower:
                return drink_name, advice
        
        # Fallback recommendation
        return "Gemma 4", "Welcome to Minnu AI Workspace! I recommend trying our brand new signature Gemma 4. It's carefully balanced to inspire creativity and focus."

class SalesTracker:
    def __init__(self):
        self.db_path = 'users.db'

    def record_sale(self, drink_name, final_price):
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('INSERT INTO sales (drink_name, price) VALUES (?, ?)', (drink_name, final_price))
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"Error recording sale to database: {e}")

    def get_report(self):
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('SELECT SUM(price), COUNT(*) FROM sales')
            row = cursor.fetchone()
            total_revenue = row[0] if row[0] is not None else 0.0
            sales_count = row[1]
            
            cursor.execute('SELECT drink_name, COUNT(*) FROM sales GROUP BY drink_name ORDER BY COUNT(*) DESC')
            rows = cursor.fetchall()
            conn.close()
            
            popular_drinks = {row[0]: row[1] for row in rows}
            return {
                "total_revenue": total_revenue,
                "sales_count": sales_count,
                "popular_drinks": popular_drinks
            }
        except Exception:
            return {
                "total_revenue": 0.0,
                "sales_count": 0,
                "popular_drinks": {}
            }

class BaristaApp:
    def __init__(self, is_test_mode=False):
        self.inventory = Inventory()
        self.menu = Menu()
        self.assistant = Gemma4Assistant()
        self.tracker = SalesTracker()
        self.is_test_mode = is_test_mode

    def clear_screen(self):
        if not self.is_test_mode:
            os.system('cls' if os.name == 'nt' else 'clear')

    def animate_brewing(self, drink_name):
        """Simulates step-by-step coffee brewing with progress animations."""
        if self.is_test_mode:
            return # Skip delay in automated tests to prevent execution lag
        
        steps = [
            ("Grinding premium coffee beans...", 0.4),
            ("Heating filtered water to optimal 94°C...", 0.4),
            ("Extracting rich espresso crema...", 0.6),
            ("Frothing milk into microfoam...", 0.5) if "Latte" in drink_name or "Cappuccino" in drink_name or "Gemma 4" in drink_name else ("Pouring water to dilute espresso...", 0.3),
            ("Adding signature lavender syrup and gold dust...", 0.5) if "Gemma 4" in drink_name else ("", 0.0),
            ("Assembling the perfect brew...", 0.3),
        ]
        
        print(f"\n{Style.COFFEE}☕ Brewing your {drink_name}...{Style.RESET}")
        for step, duration in steps:
            if not step:
                continue
            sys.stdout.write(f"  {Style.GRAY}{step:<50}{Style.RESET}")
            sys.stdout.flush()
            
            # Progress bar animation
            bar_width = 15
            for i in range(bar_width + 1):
                pct = int((i / bar_width) * 100)
                filled = "=" * i
                empty = " " * (bar_width - i)
                sys.stdout.write(f"\r  {Style.GRAY}{step:<45} {Style.TEAL}[{filled}{empty}] {pct}%{Style.RESET}")
                sys.stdout.flush()
                time.sleep(duration / bar_width)
            print(f" {Style.GREEN}✓ Done{Style.RESET}")
        
        print(f"\n{Style.GREEN}{Style.BOLD}✨ Your fresh cup of {drink_name} is served! Enjoy! ✨{Style.RESET}\n")

    def run_ai_consultation(self):
        self.clear_screen()
        print(f"{Style.TEAL}=== GEMMA 4 AI BARISTA ASSISTANT ==={Style.RESET}")
        print("Tell Gemma 4 how you are feeling or what you want (e.g., 'tired', 'something sweet', 'simple'):")
        prompt = input(f"{Style.CYAN}You: {Style.RESET}")
        
        recommended_name, advice = self.assistant.consult(prompt)
        print(f"\n{Style.GOLD}Gemma 4 AI Assistant: {Style.RESET}{advice}")
        print(f"Would you like to order the recommended {Style.BOLD}{recommended_name}{Style.RESET}? (y/n)")
        choice = input("> ").strip().lower()
        if choice == 'y':
            # Find the drink key
            for key, drink in self.menu.drinks.items():
                if drink.name.lower() == recommended_name.lower() or drink.name.lower() in recommended_name.lower():
                    return key
            print(f"{Style.RED}Error: Recommended drink not found in menu catalog.{Style.RESET}")
        return None

    def calculate_price_and_ingredients(self, drink_key, size, milk_choice, sweetness_choice, extra_shots):
        """Calculates final price and scales required ingredients."""
        drink = self.menu.drinks.get(drink_key)
        if not drink:
            return None, None

        # Size logic
        size_multipliers = {"S": 1.0, "M": 1.2, "L": 1.5}
        size_price_mult = {"S": 1.0, "M": 1.2, "L": 1.4}
        
        mult = size_multipliers[size]
        price_mult = size_price_mult[size]
        
        # Base requirements
        req_ingredients = {}
        for ing, qty in drink.recipe.items():
            req_ingredients[ing] = qty * mult

        # Pricing formula
        final_price = drink.base_price * price_mult
        
        # Milk upgrades
        # For Gemma 4, milk is already oat milk (included in base price)
        if drink.name != "Gemma 4":
            if milk_choice == "Oat":
                req_ingredients["oat_milk"] = req_ingredients.pop("milk", 0)
                final_price += 0.50
            elif milk_choice == "Soy":
                req_ingredients["soy_milk"] = req_ingredients.pop("milk", 0)
                final_price += 0.50
            elif milk_choice == "None":
                # Deplete no milk
                req_ingredients.pop("milk", 0)
            else:
                # Whole milk used
                pass
        else:
            # Gemma 4 uses Oat milk by default
            req_ingredients["oat_milk"] = req_ingredients.pop("milk", 150 * mult)

        # Sweetness does not use extra ingredients in basic recipes, but Lavender Syrup scales if Gemma 4
        if drink.name == "Gemma 4":
            syrup_scale = {"None": 0.0, "Low": 0.5, "Medium": 1.0, "High": 1.5}
            req_ingredients["lavender_syrup"] = drink.recipe["lavender_syrup"] * mult * syrup_scale[sweetness_choice]
            # Adjust price based on syrup customization slightly? Keep base price for simplicity but adjust ingredients

        # Extra Espresso shots
        if extra_shots > 0:
            final_price += 0.80 * extra_shots
            req_ingredients["coffee_beans"] += 15 * extra_shots
            req_ingredients["water"] += 30 * extra_shots

        return final_price, req_ingredients

    def place_order(self, preselected_key=None):
        if not preselected_key:
            self.menu.display()
            print("Select a drink by entering the number (or 'c' to go back):")
            drink_key = input("> ").strip()
            if drink_key.lower() == 'c':
                return
        else:
            drink_key = preselected_key

        drink = self.menu.drinks.get(drink_key)
        if not drink:
            print(f"{Style.RED}Invalid selection.{Style.RESET}")
            time.sleep(1)
            return

        print(f"\nConfiguring {Style.BOLD}{drink.name}{Style.RESET}:")
        
        # Size selection
        size = "S"
        if not self.is_test_mode:
            print("Select Size: (S)mall, (M)edium, (L)arge")
            size_choice = input("> ").strip().upper()
            if size_choice in ["S", "M", "L"]:
                size = size_choice

        # Milk selection (if drink contains milk and is not Gemma 4)
        milk = "Standard"
        if drink.recipe["milk"] > 0 and drink.name != "Gemma 4":
            print("Select Milk Type: (W)hole Milk, (O)at Milk [+$0.50], (S)oy Milk [+$0.50], (N)one")
            milk_choice = input("> ").strip().upper()
            if milk_choice == "O":
                milk = "Oat"
            elif milk_choice == "S":
                milk = "Soy"
            elif milk_choice == "N":
                milk = "None"
            else:
                milk = "Whole"
        elif drink.name == "Gemma 4":
            milk = "Oat"

        # Sweetness selection
        sweetness = "Medium"
        if not self.is_test_mode:
            print("Select Sweetness Level: (N)one, (L)ow, (M)edium, (H)igh")
            sweet_choice = input("> ").strip().upper()
            if sweet_choice == "N":
                sweetness = "None"
            elif sweet_choice == "L":
                sweetness = "Low"
            elif sweet_choice == "H":
                sweetness = "High"
            else:
                sweetness = "Medium"

        # Extra shots
        extra_shots = 0
        if not self.is_test_mode:
            print("Would you like extra espresso shots? (Enter quantity 0-3):")
            try:
                extra_shots = int(input("> ").strip())
                if extra_shots < 0 or extra_shots > 3:
                    extra_shots = 0
            except ValueError:
                extra_shots = 0

        # Calculate costs and requirements
        final_price, req_ingredients = self.calculate_price_and_ingredients(
            drink_key, size, milk, sweetness, extra_shots
        )

        # Inventory check
        missing = self.inventory.check_ingredients(req_ingredients)
        if missing:
            print(f"\n{Style.RED}❌ Order Blocked! Insufficient stock of:{Style.RESET}")
            for m in missing:
                print(f"  - {m}")
            if not self.is_test_mode:
                input("\nPress Enter to return to main menu...")
            return

        # Checkout Bill
        print(f"\n{Style.TEAL}┌────────────────────────────────────────┐{Style.RESET}")
        print(f"{Style.TEAL}│               RECEIPT                  │{Style.RESET}")
        print(f"{Style.TEAL}├────────────────────────────────────────┤{Style.RESET}")
        print(f"{Style.TEAL}│ Item:     {drink.name:<28} │{Style.RESET}")
        print(f"{Style.TEAL}│ Size:     {size:<28} │{Style.RESET}")
        print(f"{Style.TEAL}│ Milk:     {milk:<28} │{Style.RESET}")
        print(f"{Style.TEAL}│ Sweet:    {sweetness:<28} │{Style.RESET}")
        if extra_shots > 0:
            print(f"{Style.TEAL}│ Extras:   +{extra_shots} Shot(s)                    │{Style.RESET}")
        print(f"{Style.TEAL}├────────────────────────────────────────┤{Style.RESET}")
        print(f"{Style.TEAL}│ TOTAL:    ${final_price:.2f}{'':<24} │{Style.RESET}")
        print(f"{Style.TEAL}└────────────────────────────────────────┘{Style.RESET}")

        if not self.is_test_mode:
            print("Confirm Payment? (y/n)")
            confirm = input("> ").strip().lower()
            if confirm != 'y':
                print("Order cancelled.")
                time.sleep(1)
                return

        # Perform depletion and brew
        self.inventory.deplete(req_ingredients)
        self.tracker.record_sale(drink.name, final_price)
        
        # Generate physical receipt ticket in CLI
        import datetime
        ticket_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ticket_str = f"""========================================
           MINNU AI COFFEE SHOP         
             ORDER RECEIPT             
========================================
Timestamp:   {ticket_time}
Drink:       {drink.name}
Size:        {size}
Milk Type:   {milk}
Extra Shots: {extra_shots}
----------------------------------------
Total Price: ${final_price:.2f}
Status:      Paid & Served (CLI Order)
========================================
"""
        # Save ticket to workspace root
        root_dir = os.path.dirname(os.path.abspath(__file__))
        ticket_path = os.path.join(root_dir, "latest_order_ticket.txt")
        try:
            with open(ticket_path, "w", encoding="utf-8") as f:
                f.write(ticket_str)
        except Exception as file_err:
            pass

        self.animate_brewing(drink.name)
        
        if not self.is_test_mode:
            input("Press Enter to continue...")

    def run_admin_dashboard(self):
        self.clear_screen()
        print(f"{Style.RED}=== ADMIN DASHBOARD CONTROL ==={Style.RESET}")
        print("Please enter the admin passcode:")
        passcode = input("> ").strip()
        if passcode != "barista77":
            print(f"{Style.RED}Authentication Failure! Access Denied.{Style.RESET}")
            time.sleep(1.5)
            return

        while True:
            self.clear_screen()
            print(f"{Style.RED}=== ADMIN PORTAL (AUTHORIZED) ==={Style.RESET}")
            print("1. View Current Inventory Stock")
            print("2. Restock All Ingredients")
            print("3. View Sales & Revenue Report")
            print("4. Exit Admin Portal")
            
            choice = input("> ").strip()
            if choice == "1":
                self.clear_screen()
                print(f"{Style.BOLD}Current Inventory Levels:{Style.RESET}")
                for key, val in self.inventory.stock.items():
                    unit = "ml" if "milk" in key or key == "water" or key == "lavender_syrup" else ("g" if key == "gold_dust" or key == "coffee_beans" else "units")
                    print(f"  - {key.replace('_', ' ').title()}: {val:.1f} {unit}")
                input("\nPress Enter to continue...")
            elif choice == "2":
                self.inventory.restock()
                print(f"\n{Style.GREEN}✓ All stock replenished to peak capacities.{Style.RESET}")
                time.sleep(1.5)
            elif choice == "3":
                self.clear_screen()
                report = self.tracker.get_report()
                print(f"{Style.BOLD}Sales Report Summary:{Style.RESET}")
                print(f"  - Total Transactions: {report['sales_count']}")
                print(f"  - Total Revenue:      ${report['total_revenue']:.2f}")
                print(f"\nPopular Drinks Ordered:")
                for d_name, count in report['popular_drinks'].items():
                    print(f"  - {d_name}: {count} orders")
                input("\nPress Enter to continue...")
            elif choice == "4":
                break

    def run_main_loop(self):
        while True:
            self.clear_screen()
            print(f"\n{Style.TEAL}=================================================={Style.RESET}")
            print(f"{Style.TEAL}          MINNU AI - AGENTIC BARISTA APP          {Style.RESET}")
            print(f"{Style.TEAL}=================================================={Style.RESET}")
            print(f"1. Open Coffee Menu & Place Order")
            print(f"2. Consult Gemma 4 AI Assistant")
            print(f"3. Access Admin Panel")
            print(f"4. Shutdown Barista App")
            print(f"{Style.TEAL}──────────────────────────────────────────────────{Style.RESET}")
            
            choice = input("Enter choice (1-4): ").strip()
            if choice == "1":
                self.place_order()
            elif choice == "2":
                selected_key = self.run_ai_consultation()
                if selected_key:
                    self.place_order(preselected_key=selected_key)
            elif choice == "3":
                self.run_admin_dashboard()
            elif choice == "4":
                print(f"\n{Style.CYAN}Shutting down the Barista App workspace. Have a good day!{Style.RESET}\n")
                break
            else:
                print(f"{Style.RED}Invalid input. Please choose a option between 1 and 4.{Style.RESET}")
                time.sleep(1)

def run_automated_tests():
    """Stability Guard Automated Test Suite."""
    print("Minnu AI QA Verification - Running Self-Tests...")
    app = BaristaApp(is_test_mode=True)

    # Restock database to ensure starting values are clean
    app.inventory.restock()

    # Clear sales table to ensure revenue calculations start from zero
    conn = sqlite3.connect(app.inventory.db_path)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM sales')
    conn.commit()
    conn.close()

    # Test 1: Inventory Initial Stock
    assert app.inventory.stock["water"] == 2000, "Initial water level should be 2000ml"
    assert app.inventory.stock["gold_dust"] == 20, "Initial gold dust should be 20g"
    print("Test 1 Passed: Initial Inventory state matches specs.")

    # Test 2: Price Calculation for Standard Drink
    # Espresso, Small, Standard, Medium, 0 extra shots
    price_espresso, req_espresso = app.calculate_price_and_ingredients("1", "S", "Standard", "Medium", 0)
    assert price_espresso == 3.00, f"Expected Espresso base price $3.00, got ${price_espresso}"
    assert req_espresso["coffee_beans"] == 15, f"Expected 15g coffee beans, got {req_espresso['coffee_beans']}"
    print("Test 2 Passed: Base price calculation and recipes correct.")

    # Test 3: Upgrades and Scaling
    # Americano, Large (1.4x price, 1.5x ingredients), Standard, Medium, 1 extra shot
    # Americano base price is 3.50. Large price = 3.50 * 1.4 = 4.90. Extra shot = +0.80 -> 5.70
    # Ingredients: Coffee beans = 15 * 1.5 = 22.5. Extra shot adds 15g -> 37.5g
    price_am, req_am = app.calculate_price_and_ingredients("2", "L", "Standard", "Medium", 1)
    assert abs(price_am - 5.70) < 0.01, f"Expected $5.70, got ${price_am}"
    assert req_am["coffee_beans"] == 37.5, f"Expected 37.5g coffee beans, got {req_am['coffee_beans']}"
    print("Test 3 Passed: Drink scaling and extra shots modifier calculations match expectations.")

    # Test 4: Signature Drink Gemma 4 recipe depletion
    # Gemma 4, Medium (1.2x price, 1.2x ingredients). 
    # Base: 30g beans, 80ml water, 150ml milk, 15ml lavender, 1g gold.
    # Scaled: beans=36g, water=96ml, oat_milk=180ml, lavender=18ml, gold=1.2g.
    price_gemma, req_gemma = app.calculate_price_and_ingredients("5", "M", "Oat", "Medium", 0)
    assert abs(price_gemma - 7.80) < 0.01, f"Expected Gemma 4 Medium price to be 6.50*1.2=$7.80, got ${price_gemma}"
    assert req_gemma["gold_dust"] == 1.2, f"Expected 1.2g gold dust, got {req_gemma['gold_dust']}"
    assert req_gemma["oat_milk"] == 180, f"Expected 180ml oat milk, got {req_gemma['oat_milk']}"
    print("Test 4 Passed: Premium Gemma 4 customization and ingredient mapping verified.")

    # Test 5: Out of stock scenario
    # Drain gold dust and check if Gemma 4 can be ordered
    conn = sqlite3.connect(app.inventory.db_path)
    cursor = conn.cursor()
    cursor.execute('UPDATE inventory SET qty = 0.5 WHERE item = "gold_dust"')
    conn.commit()
    conn.close()
    missing = app.inventory.check_ingredients(req_gemma)
    assert len(missing) > 0, "Gemma 4 should fail ingredient check due to low gold dust"
    assert "gold_dust" in missing[0], "Error message must point to gold_dust shortage"
    print("Test 5 Passed: Inventory blocking triggers correctly on depleted stock.")

    # Test 6: AI Assistant consultation mapping
    rec_drink, _ = app.assistant.consult("I am extremely tired and need focus")
    assert rec_drink == "Gemma 4 (Signature)", f"Expected Gemma 4 recommendation, got {rec_drink}"
    rec_drink_2, _ = app.assistant.consult("give me something simple")
    assert rec_drink_2 == "Espresso", f"Expected Espresso recommendation, got {rec_drink_2}"
    print("Test 6 Passed: AI Barista keyword recommendation routing verified.")

    # Test 7: Sales tracking & restock
    app.tracker.record_sale("Gemma 4", 7.80)
    app.tracker.record_sale("Espresso", 3.00)
    report = app.tracker.get_report()
    assert report["total_revenue"] == 10.80, f"Expected revenue $10.80, got ${report['total_revenue']}"
    assert report["sales_count"] == 2, "Expected 2 sales recorded"
    
    app.inventory.restock()
    assert app.inventory.stock["gold_dust"] == 20, "Gold dust should be reset to 20g on restocking"
    print("Test 7 Passed: Sales logging and inventory replenishment verified.")

    print("\n" + Style.GREEN + "All 7 Automated Test Cases Completed Successfully!" + Style.RESET)

if __name__ == "__main__":
    # Check if run in test mode
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        try:
            run_automated_tests()
            sys.exit(0)
        except Exception as e:
            print(f"Test Suite Failed with Exception: {e}", file=sys.stderr)
            import traceback
            traceback.print_exc(file=sys.stderr)
            sys.exit(1)
    else:
        # Launch Interactive App
        try:
            app = BaristaApp()
            app.run_main_loop()
        except KeyboardInterrupt:
            print("\nShutting down Barista App. Goodbye!")
            sys.exit(0)
