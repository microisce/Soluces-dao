import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
// import React from "react";
import "./Create.css";
import FileUploaderBox from "../../../components/FileUploaderBox";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useBesoinState } from "../../../store/besoin_store";
import moment from "moment";
import Typography from "@mui/material/Typography";

// type Props = {};
export const InputForm = () => {
  return (
    <Stack>
      <Box>
        <Typography sx={{ mt: 2 }}>Aide utilisateur</Typography>
        <TextArea rows={3} style={{ marginTop: 5 }} />
        <Typography sx={{ mt: 2 }}>Commentaire utilisateur</Typography>
        <TextArea rows={3} style={{ marginTop: 5 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          width: "100%",
          mt: 2,
        }}
      ></Box>
    </Stack>
  );
};

const Items: string[] = [
  "APD",
  "BAIL",
  "CARTE AMERS",
  "DTI",
  "DP",
  "GESTION",
  "SYNOPTIQUE",
];

const steps: string[] = [
  "AP1",
  "AP2",
  "AP3",
  "AP4",
  "AP5",
  "AP6",
  "AP7",
  "AP8",
  "AP9",
  "AP10",
];

const Details = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const { active_besoin, step_list, active_step } = useBesoinState();

  const [rightActiveButtonId, setRightActiveButtonId] =
    React.useState<number>();

  const [itemsList, setItemsList] = useState<string[]>([]);

  // const [leftActiveButtonId, setLeftActiveButtonId] = React.useState<number>();

  const handleChange = (event: SelectChangeEvent<typeof itemsList>) => {
    const {
      target: { value },
    } = event;
    setItemsList(typeof value === "string" ? value.split(",") : value);
  };

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <Grid container sx={{ position: "relative" }}>
      <Grid xs={12}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {steps.map((step, index) => (
              <Typography
                variant="button"
                key={index}
                sx={{ cursor: "pointer" }}
              >
                {step}
              </Typography>
            ))}
          </Breadcrumbs>
        </Container>
      </Grid>

      <Grid xs={12} container height={"80px"}>
        <Grid
          xs={3}
          flexDirection={"column"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body2">Numero d'identification</Typography>
          <Typography>{active_besoin?.id ?? "1"}</Typography>
        </Grid>
        <Grid
          xs={6}
          flexDirection={"column"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body2">Designation</Typography>
          <Typography>{active_besoin?.designation ?? "EB12"}</Typography>
        </Grid>
        <Grid
          xs={3}
          flexDirection={"column"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body2">Derniere modification</Typography>
          <Typography>
            {moment(active_besoin?.update_at ?? new Date()).calendar()}
          </Typography>
        </Grid>
      </Grid>
      <Grid xs={3}>
        <Stack>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mt: -0.5 }}>Document utils</Typography>
            <TextArea rows={2} style={{ marginTop: 2 }} />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mt: 2 }}>Glisser/déposer Document</Typography>
            <TextArea rows={3} style={{ marginTop: 2 }} />
          </Box>
        </Stack>
      </Grid>
      <Grid xs={6}>
        <Typography width={"100%"} variant="body2" textAlign={"center"}>
          Description
        </Typography>
        <Box sx={{ px: 2 }}>
          <FileUploaderBox />
          <InputForm />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 5,
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #0a76cf",
                color: "#0a76cf",
                backgroundColor: "transparent",
                borderRadius: 5,
              }}
            >
              Precedent
            </Button>
            <Box
              onClick={() => {
                console.log("later");
              }}
            >
              <Typography
                sx={{
                  color: "#0a76cf",
                  cursor: "pointer",
                  textDecorationLine: "underline",
                }}
              >
                terminer plus tard
              </Typography>
            </Box>

            <Box>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  backgroundColor: "red",
                  borderRadius: 5,
                  marginRight: 10,
                }}
              >
                NO
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  backgroundColor: "green",
                  borderRadius: 5,
                }}
              >
                OK
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid xs={3}>
        <FormControl sx={{ width: "100%", mt: 2.5 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            Liste de critères
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={itemsList}
            onChange={handleChange}
            input={<OutlinedInput label="Liste de critères" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {Items.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={itemsList.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 5, mb: 3 }}>
          <Typography>Choix utilisateur</Typography>
          <Box
            sx={{
              border: "1px solid #dedede",
              width: "100%",
              height: 500,
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Stack>
                {itemsList.map((item, index) => (
                  <Typography key={index}>{item}</Typography>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Details;
