# Drag-and-Drop Tagging System with FullCalendar

This project showcases a drag-and-drop tagging system built using `React` and `FullCalendar`. It enables users to attach tags to calendar events via a drag-and-drop interface and includes features for event management and interaction.

## Features

- **Tagging**: Drag and drop tags onto calendar events.
- **Event Management**: Context menu options for:
  - Editing events
  - Duplicating events
  - Adding or removing tags
  - Deleting events
- **Preview**: Hover mechanics to view detailed event information.
- **Filtering**: Basic event filtering functionality.
- **Responsiveness**: Experiment with calendar responsiveness.

## Installation

This project uses `pnpm` for package management.

1. Clone the repository
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev` to start the development server

## Developer Notes

- **Local Storage**: The project uses local storage to simulate a database. This approach is suitable for development and testing but is not recommended for production environments.
- **Adaptability**: The setup includes react-query for data fetching and caching, allowing for easy adaptation to a real database. You can replace the actions folder with API endpoints to integrate with a backend system.

## Technologies Used

- `React`: The primary framework used for building the application.
- `React Query` for data fetching and caching
- `dnd-kit` for drag-and-drop functionality
- `FullCalendar` for calendar display and event management
- `Shadcn UI` for UI components
