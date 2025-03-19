# Inventory Management System

A comprehensive inventory management system built with vanilla JavaScript and localStorage for data persistence. This application is designed to be fully static and compatible with Vercel deployment.

## Features

### Core Functionality
- **CRUD Operations**: Add, view, edit, and delete inventory items
- **Data Persistence**: All data is stored in localStorage
- **Categories Management**: Create and manage product categories
- **Search & Filter**: Find items quickly with search and category filters
- **Sorting**: Sort by name, quantity, price, or last updated date

### User Interface
- **Responsive Design**: Works seamlessly across devices (mobile, tablet, desktop)
- **Dashboard**: Overview of key metrics like stock quantity and value
- **Intuitive Navigation**: Sidebar navigation for easy access to different sections
- **Modal Forms**: For adding/editing inventory items
- **Toast Notifications**: Confirm operations with non-intrusive notifications
- **Data Visualization**: Simple bar charts showing inventory breakdown by category

### Advanced Features
- **Low Stock Alerts**: Get notified when items fall below a threshold
- **Activity Log**: Track inventory updates with timestamps
- **Data Import/Export**: Backup and restore data (JSON format)
- **Settings Management**: Customize currency symbol, theme, and other preferences
- **Form Validation**: Ensures required fields are filled before submitting

## Technical Implementation

- **Vanilla JavaScript**: No frameworks or libraries for core functionality
- **Modular Code**: Well-organized, separated by functionality
- **Responsive CSS**: CSS variables for theming and media queries for responsiveness
- **LocalStorage**: All data is stored in the browser's localStorage
- **Event Delegation**: Efficient handling of events for dynamically added elements

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Start managing your inventory!

## Deployment

This application is ready to deploy on Vercel:

1. Fork or clone this repository
2. Connect to Vercel
3. Deploy!

The included `vercel.json` configuration ensures proper routing for the static site.

## Structure

