💱 Currency Converter App
This is a simple Angular-based Currency Converter application that allows users to convert between different currencies and view a history of recent conversions.

🧩 Features
Live Currency Conversion
Easily convert amounts between currencies using real-time exchange rates.

Conversion History Tab
Keep track of all your past conversions in a dedicated history view.

Modular and Standalone Components
Built using Angular standalone components and clean separation of concerns.

📂 Project Structure
currency-input/ – A reusable component for entering amounts and selecting currencies.
conversion-history/ – Displays a list of all previously made conversions.
currency.service.ts – Handles currency rate fetching logic.
currency-convert.pipe.ts – Temporary pipe used for conversion logic.
🔧 Setup
Clone the repo:

git clone https://github.com/your-username/currency-converter.git
Install dependencies:

npm install
Run the app:

ng serve
Visit http://localhost:4200

📌 TODO
❌ Remove CurrencyConvertPipe
Refactor the app to rely fully on CurrencyService instead of using the pipe.

🎨 Add CSS Styling
Improve the visual design and responsiveness of the app.

📈 Add Chart Support
Visualize conversion trends (e.g., line chart of historical rates).

🧪 Add Unit and Integration Tests
Cover all components and services with automated tests.

🖌️ Improve UX/UI Styling
Enhance layout, spacing, colors, and overall visual hierarchy.
