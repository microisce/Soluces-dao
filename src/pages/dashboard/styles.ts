export const topBarStyle = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "calc(100%-240px)",
    mt: 0,
    //border: "1px solid #000",

    // p: 1,
  },

  LogoAndUserContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 0,
  },
};

export const sideBarStyle = {
  container: {
    minHeight: "100%",
    width: "30%",
  },

  linksContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    p: 5,
    gap: 5,
  },
};

export const ContentStyle = {
  container: {
    

    borderTop: 0,
    position: "relative",
    left: 0,
    width: "100%",
    height: "100%",
    p: 5,
    pr: 10,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  createButton: {
    fontSize: 20,
  },

  filtersContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 5,
  },

  searchInput: {
    width: "50%",
  },

  searchField: {
    position: "relative",
    width: "100%",
  },
};
