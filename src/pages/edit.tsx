import React from "react"

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
    Typography
  } from "@mui/material";

import moment from "moment";
moment.locale("fr")
import FilePicker from "../components/FilePicker";
import { BASE_URL } from "../api/ApiManager";
import { Close, Visibility } from "@mui/icons-material";
import { InputForm } from "./dashboard/create/Details";
import { get_details_besoin, reset_step, save_step } from "../api/Loaders";
import VirtualizedList from "../components/ContentVariations/List";
import { useBesoinState } from "../store/besoin_store";
import { HelpDocument } from "../types/types";
import { toast } from "react-toastify";


interface BesoinDetails  {
    besoin: {
        id: number
        designation: string
        state: string
        created_at: string
        update_at: string
        owner: string
    },
    steps: {
        icon: string
        items_type: string
        multiple: boolean
        items_list: string[]
        help_documents: {
            url: string,
            title: string
        }[]
        user_right: string[]
        id: number
        title: string
        family_code: string
        id_code: string
        user_help: string
        description: string
        condition: string
        rank: number
        comment: string
        choice: string
        docs: string[]
    }[]
}


const Page = () =>{

    const queryParameters = new URLSearchParams(window.location.search) 

    const {active_step, set_active_step} = useBesoinState()
    
    const [active_besoin, set_active_besoin] = React.useState<BesoinDetails>()


    const ref = React.useRef<HTMLDivElement>(null)

    const [choices, set_choices] = React.useState<string[]>([])
    const [files, set_files] = React.useState<File[]>([])
    const [comment, set_comment] = React.useState("")

  
    const [loading, setIsLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [rightActiveButtonId, setRightActiveButtonId] = React.useState<number>();
    const [itemsList, setItemsList] = React.useState<string[]>([]);


    const id = React.useMemo(()=>{
        return parseInt(queryParameters.get("id") ?? "-1")
    }, [queryParameters])

    //React.useEffect(()=>{}, [])
    
    
    


    React.useEffect(() => {
        if (id >= 0) {
            get_details_besoin(id)
            .then(v=>{
                set_active_besoin({...v} as BesoinDetails)
                if (v.steps.length > 0) {
                    set_active_step(v.steps[0].id)
                }
            })
        }
    }, [id])


    const stepIcon = React.useMemo(() => {
        return active_besoin?.steps.find(item => item.id == active_step)?.icon
      }, [active_besoin, active_step])
    
    const getStep = React.useMemo(() => {
        return active_besoin?.steps.find(item => item.id == active_step)
    }, [active_besoin, active_step])

    const canSave = React.useMemo(()=>{
      if (
        (files.length == choices.length && choices.length == comment.length && comment.length == 0)
        || (comment == getStep?.comment && choices == getStep?.choice.split(",") )
      )
      {
        return false
      }
      return true
    }, [choices, comment, files])

    React.useEffect(()=>{
        set_comment(v => getStep?.comment ?? v)
        set_choices(v => getStep?.choice.split(",") ?? v)

    }, [getStep])

    const onStepSave = () => {
        // console.log(
        //     choices, files, comment
        
        // )
        const step_id = getStep?.id ?? -1
        if (step_id<0){
            return
        }
        save_step({
            comment, choices, files, step_id, besoin_id: id
        }).then(step => {
            get_details_besoin(id)
            .then(v=>{
                set_active_besoin({...v} as BesoinDetails)
                if (v.steps.length > 0) {
                    set_active_step(step.id)
                }
                toast.success("Enregistré avec succès");
            })
        })
    }

    const onNOK = () => {
      // console.log(
      //     choices, files, comment
      
      // )
      const step_id = getStep?.id ?? -1
      if (step_id<0){
          return
      }
      reset_step( id, step_id).then(step => {
          get_details_besoin(id)
          .then(v=>{
              set_active_besoin({...v} as BesoinDetails)
              if (v.steps.length > 0) {
                  set_active_step(step.id)
              }
              toast.success("Enregistré avec succès");
          })
      })
    }


      return (
        <Grid container sx={{ position: "relative" }} height={'90vh'} marginLeft={'2vw'} width={'95vw'} justifyContent={'center'} >
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
                  <Typography variant="caption" >{"EB" + active_besoin?.besoin?.id  ?? "1"}</Typography>
                  <Typography variant='caption'>{getStep?.id_code ?? "1"}</Typography>
                </Grid>
                <Grid
                  xs={6}
                  flexDirection={"column"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                 
                  <Typography variant="caption" >{active_besoin?.besoin?.designation ?? "EB12"}</Typography>
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
                    {moment(active_besoin?.besoin?.update_at ?? new Date()).calendar()}
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
                      <VirtualizedList data={active_besoin?.steps ?? []} height={1000}  />
                      
    
                    </Stack>
    
    
                  </Box>
                  
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
                  <Stack pt={2} direction={'column'} display={'flex'} overflow={'hidden'} flex={1}>

                  <TextField  disabled multiline rows={3} label='Aide utilisateur' value={getStep?.user_help} contentEditable={false} fullWidth />
                  <TextField multiline sx={{ mt: 2 }} rows={3} label='Commentaire utilisateur' value={comment} fullWidth onChange={(e)=>set_comment(e.target.value)}  />
                  </Stack>
    
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
                        onClick={()=>onNOK()}
                      >
                        NOK
                      </Button>
                      <Button
                        disabled={!canSave}
                        variant="outlined"
                        sx={{
                          color: "#fff",
                          backgroundColor: "green",
                          borderRadius: 5,
                        }}
                        onClick={()=>onStepSave()}
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
                    //value={[]}
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
                    renderValue={(selected) => {
                      console.log(selected)
                      return selected.filter(i=>i!='').join(', ')}
                    }
                  >
                    {getStep?.items_list?.map((item) => (
                      <MenuItem key={item} value={item}>
                        <Checkbox checked={choices.includes(item)} />
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
                      //width: "92%",
                      //height: 500,
                      flex: 1,
                      p: 2,
    
                      //overflow: 'hidden'
                    }}
                    overflow={'scroll'}
                  >
                    <Box
                      flex={1}
                      display={'flex'}
                      flexDirection={'column'}
                      height={'100%'}
                     // border={'1px solid rgba(0, 0, 0, 0.87)'}
                      //overflow={'scroll'}
                      sx={{ backgroundColor: 'transparent' }}>
                      {/* <ChipSelect /> */}
    
                      <FilePicker onSelect={v=>set_files(v)} />
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
    
    
                      sx={{ backgroundColor: 'transparent' }}>
    
                      {getStep?.help_documents?.map((data, idx) => {
                        return (
    
                          <ListItem key={idx}>
                            <Chip
                              size='small'
                              clickable
                              icon={<a href={BASE_URL + (data as HelpDocument).url} target='_blank'><Visibility sx={{ marginTop: 0.5 }} /></a>}
                              label={(data as HelpDocument).title}
                           
    
                            />
                          </ListItem>
    
    
                        );
                      })}
    
    
    
                    </Box>
    
                  </Box>
                </Box>
              </Grid>
            </>
        }
        </Grid>
      );
}

export default Page