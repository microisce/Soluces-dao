import { Box, Button, ButtonGroup, Grid, Stack, Typography } from "@mui/material";
// import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "./Create.css";
import { styles } from "./styles";
import FileUploaderBox from "../../../components/FileUploaderBox";
import TextArea from "antd/es/input/TextArea";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { useBesoinState } from "../../../store/besoin_store";
import moment from "moment";

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
      >
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ mt: 2 }}>Document utils</Typography>
          <TextArea rows={2} style={{ marginTop: 2 }} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ mt: 2 }}>Glisser/déposer Document</Typography>
          <TextArea rows={3} style={{ marginTop: 2 }} />
        </Box>
      </Box>
    </Stack>
  );
};

const Details = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const besoinId = queryParameters.get("id");

  const {active_besoin, step_list, active_step} = useBesoinState()


  const [rightActiveButtonId, setRightActiveButtonId] =
    React.useState<number>();
  const [leftActiveButtonId, setLeftActiveButtonId] = React.useState<number>();






  return (
    <Grid container>
      <Grid xs={12} container height={'80px'}>
        <Grid xs={3} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

          <Typography variant='body2'>
            Numero d'identification
          </Typography>
          <Typography>
            {active_besoin?.id?? "1"}
          </Typography>

        </Grid>
        <Grid xs={6} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

          <Typography variant='body2'>
              Designation
            </Typography>
            <Typography>
              {active_besoin?.designation?? "EB12"}
            </Typography>
        </Grid>
        <Grid xs={3} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

            <Typography variant='body2'>
              Derniere modification
            </Typography>
            <Typography>
              {moment(active_besoin?.update_at?? new Date).calendar()}
            </Typography>
        </Grid>
      </Grid>
      <Grid xs={3}>
        <Typography width={'100%'} variant='body2' textAlign={'center'}>
              Liste d'etape
          </Typography>
        <ButtonGroup
          orientation="vertical"
          sx={{ overflow: "auto", height: "100%", width: "100%" }}
        >
          {data.slice(4).map((value, index) => (
            <Button
              onClick={() => setRightActiveButtonId(index)}
              key={index}
              variant={rightActiveButtonId == index ? "contained" : "outlined"}
            >
              AP {index+1}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <Grid xs={6}>
          <Typography width={'100%'} variant='body2' textAlign={'center'}>
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
            <Box onClick={()=>{console.log('later')}}>
            <Typography
              
              sx={{
                color: "#0a76cf",
                cursor: 'pointer',
                textDecorationLine: 'underline'
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
                NOK
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
        <Typography width={'100%'} variant='body2' textAlign={'center'}>
              Liste de criteres
          </Typography>
        <ButtonGroup
          orientation="vertical"
          sx={{ overflow: "auto", width: "100%" }}
        >
          {data.slice(0,6).map((value, index) => (
            <Button
              sx={{textAlign: 'left'}}

              key={index}
              onClick={() => setLeftActiveButtonId(index)}
              variant={leftActiveButtonId == index ? "contained" : "outlined"}
            >
              CONDITION {index +1}
            </Button>
          ))}
        </ButtonGroup>
        <Typography width={'100%'} variant='body2' textAlign={'center'} pt={2}>
              Choix utilisateur
          </Typography>
        <ButtonGroup
          orientation="vertical"
          sx={{ overflow: "auto",  width: "100%" }}
        >
          {data.slice(0,3).map((value, index) => (
            <Button
              key={index}
              //onClick={() => setLeftActiveButtonId(index)}
              //variant={leftActiveButtonId == index ? "contained" : "outlined"}
            >
              CHOIX {index+1}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Details;

/*
  return (
    <Box
      sx={{
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
          <Box
            sx={{
              display: "flex",
              "& > *": {
                m: 1,
              },
              border: "1px solid #dedede",
            }}
          >
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical outlined button group"
            >
              {data.map((value, index) => (
                <Button
                  key={index}
                  variant={index == 0 ? "contained" : "outlined"}
                >
                  {value}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          {/* <List
            size="large"
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
            <InputForm />
          </Box>
          <Box>
            <List
              size="small"
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Button variant="text" style={{ color: "#0a76cf" }}>
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
                  <Button variant="text" style={{ color: "#0a76cf" }}>
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
    </Box>
  );*/
