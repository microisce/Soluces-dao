import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
// import React from "react";
import "./Create.css";
import FileUploaderBox from "../../../components/FileUploaderBox";
import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState } from "react";
import { useBesoinState } from "../../../store/besoin_store";
import moment from "moment";
import Typography from "@mui/material/Typography";
import VirtualizedList from "../../../components/ContentVariations/List";
import { Close, UploadFile, Visibility } from "@mui/icons-material";
import ChipSelect from "../../../components/ChipSelect";
import { useNavigate, useNavigation } from "react-router-dom";
import { get_details_besoin } from "../../../api/Loaders";
import FilePicker from "../../../components/FilePicker";
import { BASE_URL } from "../../../api/ApiManager";
import { HelpDocument } from "../../../types/types";

type Props = {
  help: string
  comment: string
  onChange: (v: string) => void
};
export const InputForm = (props: Props) => {
  const [comment, setComment] = React.useState(props.comment)

  const { active_besoin, active_step } = useBesoinState()

  const onChange = (v: string) => {
    setComment(v)
    props.onChange(v)
  }

  const getStep = React.useMemo(() => {
    return active_besoin?.steps.find(item => item.id == active_step)
  }, [active_besoin, active_step])



  return (
    <Stack pt={2} direction={'column'} display={'flex'} overflow={'hidden'} flex={1}>
      <TextField multiline rows={3} label='Aide utilisateur' value={props.help} contentEditable={false} fullWidth />
      <TextField multiline sx={{ mt: 2 }} rows={3} label='Commentaire utilisateur' value={comment} fullWidth onChange={(e) => onChange(e.target.value)} />
      {/* <Box  display={'flex'} mt={2} >
       
        
        <Box width={'10px'}></Box>
        
      </Box>
      
        {/* <Box  mt={2} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
          <Typography variant="caption" >
            Documents Utils
          </Typography>
        </Box> */}
      {/* <Box 
        sx={{
          flex: 1,
          mt:1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
         
          overflow: 'scroll'
        }}    
      >  */}



      {/* <Box 
          flex={1}  
          height={'100%'} 
          border={'1px solid rgba(0, 0, 0, 0.87)'}
          display={'flex'}
          flexDirection={'column'}

          overflow={'scroll'}
          sx={{backgroundColor: 'transparent'}}>
          {
           (getStep?.help_documents.split(";") ?? []).map((item, idx) => {
            return (
              <Link key={idx} href={item} target="_blank" title="link" >{item}</Link>
            )
           }
           )
          }
        </Box>
         */}



      {/* </Box> */}
      {/* <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mt={1}>
          <Link href="o" target="_blank">
            Tout Telecharger
          </Link>
         
          
      </Box> */}
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
  const navigation = useNavigate()
  const { active_besoin, active_step, set_active_step, choices, set_choices } = useBesoinState();


  const [loading, setIsLoading] = React.useState(true)
  const [id, setId] = React.useState(-1)

  const [open, setOpen] = React.useState(false)

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
  const ref = useRef<HTMLDivElement>(null)

  const getHeight = React.useMemo(() => {
    console.log(ref.current?.style.height, ref.current?.offsetHeight)
    if (ref && ref.current && ref.current.style.height) {
      return ref.current.style.height
    }
    return 100
  }, [ref])

  console.log(
    queryParameters.get("id")
  )

  React.useEffect(() => {
    if (!queryParameters.has("id")) {
      navigation("/")
    } else {
      setId(v => parseInt(queryParameters.get("id") ?? v.toString()))
    }
  }, [navigation, queryParameters])

  React.useEffect(() => {
    if (id >= 0) {
      get_details_besoin(id)
        .then(data => {
          if (data.steps.length > 0) {
            set_active_step(data.steps[0].id)
          }
        })
      setIsLoading(false)
    }
  }, [id])

  console.log(
    active_besoin,
    active_step
  )

  const stepIcon = React.useMemo(() => {
    return active_besoin?.steps.find(item => item.id == active_step)?.icon
  }, [active_besoin, active_step])

  const getStep = React.useMemo(() => {
    return active_besoin?.steps.find(item => item.id == active_step)
  }, [active_besoin, active_step])



  return (
    <Grid container sx={{ position: "relative" }} height={'75vh'}>
      {loading ?
        <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
          <CircularProgress sx={{ justifySelf: 'center' }} />
        </Stack> :
        <>
          <Grid xs={12}>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >

            </Container>
          </Grid>

          <Grid xs={12} container height={"60px"}>
            <Grid
              xs={3}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="caption" >{"EB" + active_besoin?.besoin.id  ?? "1"}</Typography>
              <Typography variant='caption'>{getStep?.id_code ?? "1"}</Typography>
            </Grid>
            <Grid
              xs={6}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
             
              <Typography variant="caption" >{active_besoin?.besoin.designation ?? "EB12"}</Typography>
            </Grid>
            <Grid
              xs={3}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="caption">Derniere modification</Typography>
              <Typography variant="caption" >
                {moment(active_besoin?.besoin.update_at ?? new Date()).calendar()}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Stack flex={1} width={'100%'} justifyContent={'center'} alignItems={'center'} >

                <Typography variant='caption' sx={{ cursor: 'auto' }}>
                  {getStep?.description}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Grid xs={2} height={'100%'}>
            <Stack height={'100%'}>
              <Typography variant="caption" sx={{ mt: -0.5 }}>List des etapes</Typography>
              <Box
                sx={{ width: "100%", scrollbarWidth: 2, scrollbarColor: 'red', overflow: 'scroll' }}
                height={'100%'}

                border={'1px solid rgba(0, 0, 0, 0.87)'}>
                <Stack alignItems={'start'} ref={ref} height={'100%'}>
                  <VirtualizedList data={active_besoin?.steps ?? []} height={1000} />
                  {/* {steps.map((step, index) => (
                <Button
                  //fullWidth
                  variant='text'
                  key={index}
                  sx={{ textAlign: 'left', alignItems: 'start', textDecoration: 'underline' }}
                >
                  {step}
                </Button>
              ))} */}

                </Stack>


              </Box>
              {/* <Box sx={{ width: "100%" }}>
            <Typography sx={{ mt: -0.5 }}>Document utils</Typography>
            <TextArea rows={2} style={{ marginTop: 2 }} />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mt: 2 }}>Glisser/déposer Document</Typography>
            <TextArea rows={3} style={{ marginTop: 2 }} />
          </Box> */}
            </Stack>
          </Grid>
          <Grid xs={7} height={'100%'} overflow={'clip'} display={'flex'} flexDirection={'column'} pt={2}>

            <Box sx={{ px: 2 }} height={'100%'} flex={1} display={'flex'} flexDirection={'column'}>
              <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'center'}
                flex={1} overflow={'scroll'}>
                  {stepIcon?.toString().includes(".mp4") || stepIcon?.toString().includes(".avi") ? 
                  <video width="100%" height="100%"  controls>
                    <source src={BASE_URL + stepIcon} type="video/mp4" />
                    Votre navigateur ne supporte les videos
                </video>:
                  <img 
                    width={'100%'} 
                    style={{ objectFit: 'cover', cursor: 'zoom-in' }} 
                    src={BASE_URL + stepIcon} onClick={() => setOpen(true)} />
                 }
                
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"

                >
                  <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <img src={BASE_URL + stepIcon} style={{cursor: 'zoom-out'}} onClick={()=>setOpen(false)} />
                    <IconButton
                      onClick={() => setOpen(false)}
                      size='large'
                      sx={{ alignSelf: 'flex-start', justifySelf: 'flex-end', marginTop: 10, backgroundColor: 'white' }}>
                      <Close fontSize='large' color='error' />
                    </IconButton>
                  </Box>
                </Modal>
              </Box>

              <Box>

                <InputForm help={getStep?.user_help ?? ""} comment={getStep?.comment ?? ""} onChange={(v) => console.log(v)} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1,
                  width: "100%",
                  //flex: 1,
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

          <Grid xs={3} display={'flex'} flexDirection={'column'}>
            <FormControl sx={{ width: "100%", mt: 2.5 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                {getStep?.items_type}
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple={getStep?.multiple}
                value={choices}
                onChange={(e) => {
                  const value = e.target.value
                  if ((typeof value) == (typeof "")) {
                    set_choices([value])
                  } else {
                    set_choices(value)
                  }
                }}
                input={<OutlinedInput label={getStep?.items_type} />}
                renderValue={(selected) => selected.join(", ")}
              >
                {getStep?.items_list?.map((item) => (
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={choices.includes(item)} />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 2 }} flex={1} overflow={'scroll'} display={'flex'} flexDirection={'column'}>
              <Typography variant="caption" >Glisser/Deposer document</Typography>
              <Box
                sx={{
                  //backgroundColor: 'red',
                  border: "1px solid #dedede",
                  width: "100%",
                  //height: 500,
                  flex: 1,
                  p: 2,

                  //overflow: 'hidden'
                }}
                overflow={'hidden'}
              >
                <Box
                  flex={1}
                  display={'flex'}
                  flexDirection={'column'}
                  height={'100%'}
                  //border={'1px solid rgba(0, 0, 0, 0.87)'}
                  //overflow={'scroll'}
                  sx={{ backgroundColor: 'transparent' }}>
                  {/* <ChipSelect /> */}

                  <FilePicker />
                </Box>

              </Box>
            </Box>

            <Box sx={{ mt: 2 }} flex={1} display={'flex'} flexDirection={'column'}>
              <Typography variant="caption" >Documents utils</Typography>
              <Box
                display={'flex'}
                flexDirection={'column'}
                maxHeight={'30vh'}
                sx={{
                  //backgroundColor: 'red',
                  border: "1px solid #dedede",
                  width: "100%",
                  //height: 500,
                  flex: 1,
                  p: 2,
                  overflow: 'scroll'

                  //msOverflowStyle: "none"


                }}

              >
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  flex={1}
                  //height={'100%'} 


                  sx={{ backgroundColor: 'transparent' }}>

                  {getStep?.help_documents?.map((data, idx) => {
                    return (

                      <ListItem key={idx}>
                        <Chip
                          size='small'
                          clickable
                          icon={<a href={BASE_URL + (data as HelpDocument).url} target='_blank'><Visibility sx={{ marginTop: 0.5 }} /></a>}
                          label={(data as HelpDocument).title}
                        //deleteIcon={<Delete onClick={(e)=>{e.stopPropagation()}}  />}
                        //onDelete={handleDelete(idx)}

                        />
                      </ListItem>


                    );
                  })}



                </Box>

              </Box>
            </Box>
          </Grid></>}
    </Grid>
  );
};

export default Details;

