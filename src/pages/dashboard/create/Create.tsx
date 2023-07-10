import { Box, Typography } from "@mui/material";
// import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "./Create.css";
import { List, Button } from "antd";
import { styles } from "./styles";
import FileUploaderBox from "../../../components/FileUploaderBox";
import TextArea from "antd/es/input/TextArea";

// type Props = {};

const data = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
  "Item 7",
  "Item 8",
  "Item 9",
  "Item 10",
];

export const BattomForm = () => {
  return (
    <>
      <Box>
        <Typography sx={{ mt: 2 }}>Aide utilisateur</Typography>
        <TextArea rows={4} style={{ marginTop: 5 }} />
        <Typography sx={{ mt: 2 }}>Commentaire utilisateur</Typography>
        <TextArea rows={4} style={{ marginTop: 5 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          width: "100%",
          mt: 2,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ mt: 2 }}>Document utils</Typography>
          <TextArea rows={4} style={{ marginTop: 5 }} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ mt: 2 }}>Glisser/déposer Document</Typography>
          <TextArea rows={4} style={{ marginTop: 5 }} />
        </Box>
      </Box>
    </>
  );
};

const Create = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "80%",
        // marginTop: 30,
        height: "100%",
        borderLeft: "1px solid #000",
        top: 0,
      }}
    >
      <div className="headerSection">
        <Box>
          <Typography>Numéro EB</Typography>
          <Typography variant="h5">Code identification</Typography>
        </Box>
        <Box>
          <Typography>Désigantion EB</Typography>
          <Typography variant="h5">Titre</Typography>
        </Box>
        <Box>
          {" "}
          <Typography>Code identification</Typography>
          <EditNoteIcon sx={{ width: 50, height: 50 }} />
        </Box>
      </div>
      <div className="formContainer">
        <Box sx={styles.scrollBoxes}>
          <List
            size="small"
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Button type="text" style={{ color: "#0a76cf" }}>
                  {item}
                </Button>
              </List.Item>
            )}
            style={{ height: "100%", width: 250, overflow: "scroll" }}
          />
          <Box sx={styles.FileBox}>
            <FileUploaderBox />
            <BattomForm />
          </Box>
          <Box>
            <List
              size="small"
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Button type="text" style={{ color: "#0a76cf" }}>
                    {item}
                  </Button>
                </List.Item>
              )}
              style={{
                height: 300,
                width: 250,
                overflow: "scroll",
              }}
            />
            <List
              size="small"
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Button type="text" style={{ color: "#0a76cf" }}>
                    {item}
                  </Button>
                </List.Item>
              )}
              style={{
                height: 300,
                width: 250,
                overflow: "scroll",
                marginTop: 15,
              }}
            />
          </Box>
        </Box>
      </div>
      <div className="buttons-container">
        <Button
          type="default"
          style={{
            border: "1px solid #0a76cf",
            color: "#0a76cf",
            backgroundColor: "transparent",
            borderRadius: 5,
          }}
        >
          Precedent
        </Button>
        <div>
          <Button
            type="default"
            style={{
              color: "#fff",
              backgroundColor: "red",
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            Cancel
          </Button>
          <Button
            type="default"
            style={{
              color: "#fff",
              backgroundColor: "green",
              borderRadius: 5,
            }}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
