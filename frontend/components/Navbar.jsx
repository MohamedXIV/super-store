import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Tab,
  Typography,
  ButtonGroup,
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MaterialUISwitch } from "../styles/styledCommponents";
import { GlobalContext } from "./Layout";

export default function Navbar({ theme }) {
  const router = useRouter();
  const [mainBtnShadow, setMainBtnShadow] = useState("#ff00ea");
  const [scrollY, setScrollY] = useState(0);
  const layoutContext = useContext(GlobalContext);

  function handleScroll() {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  function toggleDelete() {
    layoutContext.setDeleteEnabled(!layoutContext.deleteEnabled);
  }

  function couldDelete() {
    // Object.values(layoutContext.deleteList).some(v => v === true)
    return layoutContext.packedData
      .map((el) => el.checked)
      .some((v) => v === true);
  }

  function handleDelete() {
    layoutContext.setPackedData((prevState) => {
      return prevState.filter((el) => el.checked !== true);
    });
  }

  useEffect(() => {
    theme.palette.mode === "dark"
      ? setMainBtnShadow("#74FCCA")
      : setMainBtnShadow("#ff00ea");
  }, [theme]);

  return (
    <AppBar
      position={"sticky"}
      color={"inherit"}
      elevation={scrollY === 0 ? 0 : 1}
    >
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href={"/"}>
            <Tab
              label={"Super Store"}
              sx={{ color: "primary", fontSize: "1.2rem", fontWeight: "500" }}
            />
          </Link>
          {router.route !== "/addproduct" && (
            <Box
              sx={{
                width: "75%",
                maxWidth: "420px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Link href={"/addproduct"}>
                <Button
                  id="add"
                  variant={"contained"}
                  color={"primary"}
                  sx={{
                    width: "130px",
                    "&:hover": {
                      boxShadow: "0px 2px 10px " + mainBtnShadow,
                    },
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  ADD
                </Button>
              </Link>
              {!layoutContext.deleteEnabled && (
                <Button
                  id="delete-product-btn"
                  variant={"outlined"}
                  color={"error"}
                  onClick={toggleDelete}
                  sx={{ width: "130px" }}
                >
                  DELETE
                </Button>
              )}
              {layoutContext.deleteEnabled && (
                <ButtonGroup variant="outlined" color={"error"}>
                  <Button onClick={toggleDelete}>X</Button>
                  <Button
                    disabled={false}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    disableElevation
                    onClick={handleDelete}
                  >
                    MASS DELETE
                  </Button>
                </ButtonGroup>
              )}
              <MaterialUISwitch
                checked={layoutContext.darkThemeOn}
                onChange={() =>
                  layoutContext.setTheme(!layoutContext.darkThemeOn)
                }
                theme={theme}
              />
            </Box>
          )}
        </Toolbar>
      </Container>
      <Link href={"/addproduct"}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            display: { sm: "none" },
            position: "fixed",
            bottom: "10%",
            right: "10%",
          }}
        >
          <AddIcon />
        </Fab>
      </Link>
    </AppBar>
  );
}
