/**
 * Full Object Model
 * {
      divider: true, // usually alone; to draw a line
      title: true,
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      },
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "", // optional class names space delimited list for title item ex: "text-center"
      variant: "success", // any of success | danger | primary
      children: []
   }
 */
export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info"
      }
    },
    {
      divider: true
    },
    {
      name: "Admin",
      url: "/admin",
      icon: "icon-badge",
      children: [
        {
          name: "Privileges",
          url: "/admin/privileges",
          icon: "icon-grid"
        },
        {
          name: "Users",
          url: "/admin/users",
          icon: "icon-people"
        },
        {
          name: "User Roles",
          url: "/admin/userroles",
          icon: "icon-puzzle"
        }
      ]
    }
  ]
};
