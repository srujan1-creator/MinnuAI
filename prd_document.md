# Product Requirement Document (PRD) - Agentic Barista App Solution

## 1. Overview
The **Agentic Barista App Solution** is a Python-based interactive simulator that emulates a smart coffee shop experience. It allows customers to browse a menu, customize their beverages, interact with an AI Barista Assistant (**Gemma 4**), watch a live simulation of their coffee brewing, and manages back-end inventory and admin sales reporting.

---

## 2. System Logic & Workflows

### A. Customer Workflow
1. **Welcome Screen**: Introduce Minnu AI and the Gemma 4 Barista Assistant.
2. **AI Assistant consultation (Gemma 4)**: 
   - Option to chat with Gemma 4 for recommendations.
   - Gemma 4 recommends drinks based on user input (e.g., mood, tiredness, sweet preference).
3. **Menu Browsing**: Display standard menu and prices.
4. **Order Placement & Customization**:
   - Select a drink.
   - Select size (Small, Medium, Large).
   - Select milk type (Whole, Oat, Soy, None).
   - Select sweetness level (None, Low, Medium, High).
   - Option to add extra espresso shots.
5. **Inventory Check**: Ensure sufficient ingredients exist before taking payment.
6. **Payment & Billing**: Display total price breakdown and simulate payment approval.
7. **Brewing Simulation**:
   - Provide an animated, step-by-step console visualization of the brewing process.
8. **Ingredient Depletion**: Subtract used ingredients from inventory.

### B. Admin Workflow (Secured by passcode: `barista77`)
1. **View Inventory**: Display current ingredient levels.
2. **Restock Inventory**: Refill all or specific ingredients.
3. **View Sales Report**: Display total items sold, total revenue, and popular drinks.

---

## 3. Data Inputs/Outputs

### A. Coffee Menu & Recipes
| Drink Name | Base Price | Ingredients Required |
| :--- | :--- | :--- |
| **Espresso** | $3.00 | Coffee Beans (15g), Water (50ml), Cup (1) |
| **Americano** | $3.50 | Coffee Beans (15g), Water (200ml), Cup (1) |
| **Latte** | $4.50 | Coffee Beans (15g), Water (50ml), Milk (150ml), Cup (1) |
| **Cappuccino** | $4.50 | Coffee Beans (15g), Water (50ml), Milk (100ml), Cup (1) |
| **Gemma 4 (Signature)** | $6.50 | Coffee Beans (30g), Water (80ml), Milk (Oat) (150ml), Lavender Syrup (15ml), Gold Dust (1g), Cup (1) |

*Size Multipliers:* Small (1.0x price), Medium (1.2x price), Large (1.4x price). Ingredients scale accordingly: Medium (1.2x ingredients), Large (1.5x ingredients).

### B. Starting Inventory
- **Water**: 2000 ml
- **Milk**: 2000 ml (Standard)
- **Oat Milk**: 1000 ml
- **Soy Milk**: 1000 ml
- **Coffee Beans**: 500 g
- **Lavender Syrup**: 200 ml
- **Gold Dust**: 20 g
- **Cups**: 50 units

---

## 4. Gemma 4 AI Assistant Rules
The chatbot simulation accepts free-form text input and parses it for keywords to recommend a drink:
- Keywords like "tired", "sleepy", "energy" -> Recommend **Gemma 4 (Signature)** or **Espresso** for a strong caffeine boost.
- Keywords like "sweet", "treat", "sugar" -> Recommend **Gemma 4 (Signature)** (with lavender syrup) or **Latte** with sugar.
- Keywords like "light", "healthy", "simple" -> Recommend **Americano** or **Espresso**.
- Keywords like "creamy", "smooth" -> Recommend **Latte** or **Cappuccino**.

---

## 5. Architectural Constraints & Edge Cases
- **Python Compatibility**: Must run on Python 3.8+ without external third-party dependencies (use standard libraries only).
- **Out-of-Stock Prevention**: If any ingredient is insufficient, block the order, explain what is missing, and return to the main menu.
- **Input Validation**: Check all CLI inputs. If invalid, prompt the user again without crashing.
- **Verification Mode**: If run with `--test` command-line flag, execution must run in an automated non-interactive self-test suite (testing catalog load, customization calculations, inventory depletion, and admin actions) and return `sys.exit(0)` on success or `sys.exit(1)` on failure.
