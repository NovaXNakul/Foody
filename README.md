# 🍔 Foody — Food Ordering & Delivery Website

**Foody** is a web-based food ordering application that allows users to browse food items, manage their shopping cart, and place food orders through a simple and interactive interface. The application uses Firebase Realtime Database to store and retrieve menu and order information.

## 📌 Project Overview

Foody is developed as an Internet and Web Technology mini-project to demonstrate frontend web development, database connectivity, and dynamic data management in a food ordering application.

The application provides a user-friendly interface for exploring food items, managing orders, and accessing administrative functionality.

## ✨ Features

* **Food Menu:** Browse food items with their names, prices, descriptions, ratings, and categories.
* **Shopping Cart:** Add food items to the cart and manage selections.
* **User Interface:** Responsive navigation and interactive page elements.
* **User Login:** Login interface with basic user-related functionality.
* **Wishlist:** Add food items to a wishlist.
* **Coupon System:** Includes predefined discount coupons.
* **Dark Mode:** Switch between light and dark themes.
* **Admin Interface:** An administrative page for managing food-related information.
* **Firebase Integration:** Retrieve and store application data using Firebase Realtime Database.
* **Order Management:** Store order information and associate orders with user email addresses.
* **Database Status:** Display whether the application can connect to Firebase.

## 🛠️ Tech Stack

| Technology                 | Purpose                                        |
| -------------------------- | ---------------------------------------------- |
| HTML5                      | Website structure                              |
| CSS3                       | Styling and layout                             |
| JavaScript                 | Client-side functionality                      |
| Firebase Realtime Database | Cloud database and data persistence            |
| Firebase REST API          | Communication between the website and database |
| Firefox                    | Browser-based testing                          |

## 🏗️ System Architecture

The application follows a lightweight client-server architecture.

```text
             USER
               |
               v
       +----------------+
       |   Foody Website|
       |  HTML / CSS / JS|
       +----------------+
               |
               v
       +----------------+
       | Firebase REST  |
       |      API       |
       +----------------+
               |
               v
       +----------------+
       | Firebase       |
       | Realtime DB    |
       +----------------+
               |
               v
       Menu, Orders,
       User Orders
```

The frontend communicates with Firebase Realtime Database through HTTP requests. The database stores application data in a JSON tree structure.

## 🗂️ Project Structure

```text
Foody/
│
├── index.html       # Home page
├── menu.html        # Food menu
├── cart.html        # Shopping cart
├── login.html       # Login page
├── about.html       # About page
├── contact.html     # Contact page
├── admin.html       # Administrative interface
├── style.css        # Website styling
├── app.js           # Shared JavaScript and Firebase integration
└── README.md        # Project documentation
```

## 🔥 Firebase Realtime Database

Foody uses Firebase Realtime Database for cloud-based data storage.

**Database URL:** `https://iwt-food-delivery-default-rtdb.firebaseio.com/`

The application communicates with the database through Firebase's REST API.

### Database Structure

The database includes the following main data collections:

* **menu:** Stores food items, including their names, prices, descriptions, and categories.
* **orders:** Stores order information, such as order ID, customer details, items, delivery charges, discounts, and payment information.
* **userOrders:** Organizes orders by user email address and order ID.

The exact fields depend on the data stored by the application.

### Database Communication

The application uses HTTP requests to interact with Firebase.

Examples of operations include:

* `GET` — Retrieve data.
* `PUT` — Create or replace data.
* `PATCH` — Update selected fields.
* `POST` — Create a new database entry.
* `DELETE` — Remove data.

The application's shared JavaScript file contains the Firebase REST API integration.

> **Security note:** Configure Firebase Realtime Database Security Rules before deploying the application publicly. Client-side validation and password hashing alone do not provide secure authentication or authorization. Never store plaintext passwords or expose sensitive customer information.

## 🚀 Getting Started

### Prerequisites

* A modern web browser, such as Firefox.
* A code editor such as Visual Studio Code.
* Internet connectivity.
* Access to the Firebase project, if database configuration or rules need to be changed.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/NovaXNakul/Foody.git
```

**2. Navigate to the project directory**

```bash
cd Foody
```

**3. Open the project**

Open the folder in Visual Studio Code.

**4. Run the website**

Install the Live Server extension in VS Code, right-click `index.html`, and select **Open with Live Server**.

Alternatively, open `index.html` directly in a browser. Using a local development server is preferable for testing.

**5. Verify Firebase connectivity**

Open the website and check the database status displayed in the footer.

If the database is unreachable, verify the Firebase URL, network connectivity, and Realtime Database Security Rules.

## 🧪 Testing

The application can be tested manually using Firefox.

| Test ID | Test Case                               | Expected Result                                     |
| ------- | --------------------------------------- | --------------------------------------------------- |
| TC01    | Open the homepage                       | Homepage loads successfully                         |
| TC02    | Navigate to the menu                    | Food items are displayed                            |
| TC03    | Add a food item to the cart             | Cart count is updated                               |
| TC04    | Add or remove an item from the wishlist | Wishlist state changes                              |
| TC05    | Switch the theme                        | Light or dark theme is applied                      |
| TC06    | Open the login page                     | Login interface is displayed                        |
| TC07    | Load Firebase menu data                 | Menu data is retrieved successfully                 |
| TC08    | Check database connectivity             | Connection status is displayed                      |
| TC09    | Inspect order records in Firebase       | Stored order information is visible                 |
| TC10    | Test with an unavailable database       | An offline status or fallback behavior is displayed |

**Testing evidence:** Capture actual screenshots from Firefox and the Firebase Console while executing these tests. Record the observed result for each test rather than assuming every test passes.

## 📸 Screenshots

Add your project screenshots to a `screenshots/` directory.

Suggested structure:

```text
screenshots/
├── homepage.png
├── food-menu.png
├── shopping-cart.png
├── login-page.png
├── firebase-menu.png
├── firebase-orders.png
└── testing-results.png
```

Use actual screenshots captured from your running application. Add them to the repository and reference them here.

Example:

```markdown
![Foody Homepage](screenshots/homepage.png)
```

## 🔐 Security Considerations

* Configure Firebase Security Rules to prevent unauthorized database access.
* Validate user input before processing orders.
* Do not expose sensitive credentials in client-side JavaScript.
* Avoid storing plaintext passwords or unnecessary personal information.
* Use Firebase Authentication or another secure authentication mechanism for production use.
* Restrict administrative operations to authorized users.

## 🎯 Learning Outcomes

This project demonstrates:

* HTML, CSS, and JavaScript fundamentals.
* Multi-page website development.
* Client-side state management.
* Integration with a cloud-hosted database.
* REST API communication.
* Basic food ordering and cart functionality.
* Manual browser testing and database verification.
* Documentation of software features and test cases.

## 🔮 Future Enhancements

* Secure user authentication.
* Online payment gateway integration.
* Real-time order status tracking.
* Restaurant and food category filters.
* Improved mobile responsiveness.
* Automated browser testing.
* Enhanced administrative access controls.
* Deployment using Firebase Hosting.


Project Repository: [Foody](https://github.com/NovaXNakul/Foody)

## 📄 License

A license has not been specified for this repository. Add a license file if you intend to distribute the project under specific reuse terms.
