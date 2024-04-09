

# Time Tracking Table

## Description

This project implements a dynamic table in React, utilizing Ant Design for UI components, to track and manage timers. Each row in the table represents a unique timer, allowing users to start, pause, resume, and reset individual timers. Additionally, the application tracks context switches (start/pause sequences) for each timer and calculates the total accumulated time across all timers. This feature-rich table is designed to assist in time management and productivity tracking, showcasing React state management, effect hooks, and context API integration.

## Features

- **Dynamic Timer Management:** Each table row houses an independent timer with start, pause, resume, and reset capabilities.
- **Context Switch Tracking:** Monitors the number of times each timer is started and paused, providing insights into user activity.
- **Total Time Calculation:** Aggregates the time from all timers, displaying the sum in a human-readable format.
- **Editable Rows:** Supports in-line editing of row content, such as task names, for better task management.
- **Persistence:** Utilizes `localStorage` to save and retrieve timers, ensuring data persistence across browser sessions.

## Technologies Used

- **React:** For building the user interface.
- **Ant Design (antd):** For UI components like tables, buttons, and forms.
- **UUID:** To generate unique identifiers for each timer row.
- **Local Storage:** For data persistence.

## Setup and Installation

1. **Clone the repository:**

```bash
git clone https://your-repository-link.git
cd your-project-directory
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the application:**

```bash
npm start
```

This will start the application on `localhost:3000` by default.

## Usage

- **Add a Timer:** Use the form above the table to add a new timer row. Specify the task name and click "Submit".
- **Manage Timers:** Each row has controls to start, pause, resume, and reset the timer. Use these to manage individual timers.
- **Edit Task Names:** Click on a task name to edit it directly in the table row.
- **View Total Time:** The total accumulated time across all timers is displayed above the table.


## To Do Features (for contributors)

- Maintain state changes in a localstorage.  
- Keep historical data in localstorage. 
- Create an analytics dashboard to compare between historical data. 
- Create an export button to share the data in csv, or xsl format. 


## Contributing

Contributions to enhance this project are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeatureName`.
3. Make your changes and commit them: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeatureName`.
5. Submit a pull request.

## License

This project is open-source and available under the MIT License.
