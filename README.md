## Fontsource
Font installation is handled with [Fontsource](https://fontsource.org/)

1) Install the font from fontsource
2) Import the font into `theme.js`
3) Apply fonts with `fontfamily="fontName"` attribute, or the sx prop: `sx={{ fontFamily: 'fontName'}}`
4) OR create a custom variant inside `theme.js`:

```js
const theme = createTheme({
  cssVariables: true,
  typography: {
      logoFont: { // Add 'variant=logoFont' to a component
      fontFamily: "Permanent Marker",
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    grey: {
      ...grey,
    },
    error: {
      main: red.A400,
    },
  },
});
```

# Data Model
*To view diagram in vscode, open a preview of this markdown file*
```mermaid
erDiagram
    USERS ||--o{ PROJECTS : creates
    PROJECTS ||--o{ TASKS : contains
    
    USERS {
        uuid id PK
        string email
        string password
        string name
        timestamp created_at
        timestamp updated_at
    }
    
    PROJECTS {
        uuid id PK
        string name
        string description
        uuid user_id FK
        timestamp created_at
        timestamp updated_at
    }
    
    TASKS {
        uuid id PK
        string title
        string description
        boolean completed
        boolean starred
        uuid project_id FK
        timestamp created_at
        timestamp updated_at
    }
```