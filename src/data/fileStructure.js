export const fileStructure = [
  {
    name: "backend",
    type: "folder",
    children: [
      { name: "server.js", type: "file" },
      { name: "package-lock.json", type: "file" },
      { name: "package.json", type: "file" },
    ],
  },
  {
    name: "frontend",
    type: "folder",
    children: [
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "components",
            type: "folder",
            children: [
              {
                name: "CourseCard",
                type: "folder",
                children: [
                  { name: "CourseCard.css", type: "file" },
                  { name: "CourseCard.jsx", type: "file" },
                ],
              },
              {
                name: "ProgressCircle",
                type: "folder",
                children: [
                  { name: "ProgressCircle.css", type: "file" },
                  { name: "ProgressCircle.jsx", type: "file" },
                ],
              },
              {
                name: "StatCard",
                type: "folder",
                children: [
                  { name: "StatCard.css", type: "file" },
                  { name: "StatCard.jsx", type: "file" },
                ],
              },
              {
                name: "layout",
                type: "folder",
                children: [
                  { name: "DashboardLayout.css", type: "file" },
                  { name: "DashboardLayout.jsx", type: "file" },
                  { name: "Header.css", type: "file" },
                  { name: "Header.jsx", type: "file" },
                  { name: "Sidebar.css", type: "file" },
                  { name: "Sidebar.jsx", type: "file" },
                ],
              },
            ],
          },
          {
            name: "context",
            type: "folder",
            children: [{ name: "AuthContext.jsx", type: "file" }],
          },
          {
            name: "pages",
            type: "folder",
            children: [
              {
                name: "BrowseCourses",
                type: "folder",
                children: [
                  { name: "BrowseCourses.css", type: "file" },
                  { name: "BrowseCourses.jsx", type: "file" },
                ],
              },
              {
                name: "Certificates",
                type: "folder",
                children: [
                  { name: "Certificates.css", type: "file" },
                  { name: "Certificates.jsx", type: "file" },
                ],
              },
              {
                name: "CoursePlayer",
                type: "folder",
                children: [
                  { name: "CoursePlayer.css", type: "file" },
                  { name: "CoursePlayer.jsx", type: "file" },
                ],
              },
              {
                name: "Dashboard",
                type: "folder",
                children: [
                  { name: "Dashboard.css", type: "file" },
                  { name: "Dashboard.jsx", type: "file" },
                ],
              },
              {
                name: "GEMINI",
                type: "folder",
                children: [{ name: "GEMINI.jsx", type: "file" }],
              },
              {
                name: "Login",
                type: "folder",
                children: [
                  { name: "Login.css", type: "file" },
                  { name: "Login.jsx", type: "file" },
                ],
              },
              {
                name: "MyCourses",
                type: "folder",
                children: [
                  { name: "MyCourses.css", type: "file" },
                  { name: "MyCourses.jsx", type: "file" },
                ],
              },
              {
                name: "Quiz",
                type: "folder",
                children: [
                  { name: "Quiz.css", type: "file" },
                  { name: "Quiz.jsx", type: "file" },
                ],
              },
              {
                name: "Signup",
                type: "folder",
                children: [
                  { name: "Signup.css", type: "file" },
                  { name: "Signup.jsx", type: "file" },
                ],
              },
            ],
          },
          { name: "App.jsx", type: "file" },
          { name: "main.jsx", type: "file" },
          { name: "App.css", type: "file" },
          { name: "index.css", type: "file" },
        ],
      },

      {
        name: "vite.config.js",
        type: "file",
      },
      {
        name: "index.html",
        type: "file",
      },
      { name: "package-lock.json", type: "file" },
      {
        name: "package.json",
        type: "file",
      },
    ],
  },
];
