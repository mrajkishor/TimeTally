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


## To Do Features

- Maintain state changes in a localstorage.  
- Keep historical data in localstorage. 
- Create an analytics dashboard to compare between historical data. 
- Create an export button to share the data in csv, or xsl format. 