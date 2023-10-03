import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  InputLabel,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DataBaseType, Step } from "../../types/types";
import { useEffect, useState } from "react";
import { getFamilyCodeChoices, getTypesList } from "../../api/Loaders";
import { StyledTextarea, style } from "./styles";
import ChipSelect from "../ChipSelect";
import FilePicker from "../FilePicker";
import React from "react";

type CreateDataModalProps = {
  open: boolean;
  onClose: () => void;
  createData:  (data: Step) => Promise<boolean>;
  initial?: DataBaseType
};

const initialValues = {
  id: 0,
  family_code: "",
  id_code: "",
  icon: "",
  title: "",
  description: "",
  file: "",
  items_type: "",
  condition: "",
  help: "",
 // comment: "",
  help_documents: "",
  //complexity_point: "",
  user_right: "",
  rank: 0
};



const availableRights: string[] = [
  "administrateur",
  "externe",
  "moderateur",
  "interne",
  "gestion",
  "formation",
  "client",
];

const CreateDataModal = ({
  open,
  onClose,
  createData,
  initial
}: CreateDataModalProps) => {
  const [data, setData] = useState<DataBaseType>(initial?.id ? initial : initialValues);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [familyCodeChoices, setFamilyCodeChoices] = useState<string[]>([])

  const [formData, setFormData] = React.useState<Step>({...initial} as Step)

  const fetchTypes = () => {
    getTypesList()
      .then((data) => {
        setTypes(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const interval = setInterval(()=>{
      fetchTypes();
      getFamilyCodeChoices().then(v=>setFamilyCodeChoices(v))
    }, 3000)

    return ()=>clearInterval(interval)
    
  }, [open]);

  const handleValuesChange = (e: {
    target: { name: string; value: string };
  }) => {
    console.log(e)
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRightsChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;

    setSelectedList(typeof value === "string" ? value.split(",") : value);
  };

  const submitData = () => {
    console.log(formData)
    // const copied_data = {
    //   ...data,
    // };
    // console.log(copied_data)
     
    createData(formData)
    .then(ok => {
      if (ok){
        onClose()
      }
    })
    //setData(initialValues);
  };

  useEffect(() => {
    if (selectedList.length > 0) {
      setData((prevData) => ({
        ...prevData,
        user_right: selectedList.join(";"),
      }));
    }

  }, [selectedList]);

  useEffect(() => {
    if (initial?.id){
      setData(initial)
    }
    

  }, [initial]);

  useEffect(() => {
    console.log(data)
  }, [data]);

  console.log(initial)



  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            variant="text"
            sx={{ position: "absolute", right: 20, top: 20, color: "red" }}
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
          <Typography variant="subtitle1">{initial ? "Edition" : "Creation"} des données</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: 3,
              marginTop: 3,
            }}
          >
            <Stack direction={'row'} width={'100%'} justifyContent={'space-between'} >
              <Autocomplete
                noOptionsText={<Box display={'flex'} justifyContent={'center'} alignItems={'center'}><CircularProgress /></Box>}
                sx={{ width: "90%", flex: 1, marginRight: 3 }}
                //freeSolo
                //onSelect={(e)=>console.log(e)}
                options={familyCodeChoices}
                // onClose={()=>{
                //   if (!familyCodeChoices.includes(data.family_code)){
                //     handleValuesChange({target:{name: "family_code", value: "" }})
                //   }
                // }}
                autoSelect
                autoComplete
                //onChange={(e, v) => console.log(e, v)}
                onChange={(e, v) => v ? setFormData(f=>({...f, family_code: v})): null}
                //onChange={(e, v) => v ? handleValuesChange({target:{name: "family_code", value: v }}): null}
                //onInputChange={(e, v) => v ? handleValuesChange({target:{name: "family_code", value: v }}): null}
                value={formData.family_code}
                renderInput={(params) => <TextField {...params}  autoCapitalize="all" variant="outlined" name="family_code" label="Code famille" />}
              />
              <TextField
                variant="outlined"
                sx={{ width: "90%", flex: 1 , marginLeft: 3 }}
                label="Code Identifiant"
                name="id_code"
                value={formData.id_code}
                onChange={(e) => setFormData(f=>({...f, id_code: e.target.value}))}
                //onChange={handleValuesChange}
              />
            </Stack>
            
            {/* <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              label="Lien vers icone"
              name="icon"
              value={data.icon}
              //onChange={handleValuesChange}
              onChange={(e) => v ? setFormData(f=>({...f, family_code: v})): null}
            /> */}
            <Typography alignSelf={'flex-start'} mb={-2}>
              Icon
            </Typography>
            <FilePicker single  onSelect={v=>setFormData(f=>({...f, icon: v[0]}))} />

            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              label="Titre"
              name="title"
              value={formData.title}
              //onChange={handleValuesChange}
              onChange={(e) => setFormData(f=>({...f, title: e.target.value}))}
            />
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              label="Déscription"
              name="description"
              multiline
              minRows={3}
              value={formData.description}
              //onChange={handleValuesChange}
              onChange={(e) => setFormData(f=>({...f, description: e.target.value}))}
            />

            {/* <StyledTextarea
              aria-label="minimum height"
              minRows={3}
              placeholder="Fichiers..."
              name="file"
              value={data.file}
              onChange={handleValuesChange}
            /> */}

            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Liste de critères
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="items_type"
                  value={formData.items_type}
                  label="Liste de critères"
                 // onChange={handleValuesChange}
                 onChange={(e) => setFormData(f=>({...f, items_type: e.target.value}))}
                >
                  {(types ?? []).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <TextField
              aria-label="minimum height"
              multiline
              minRows={3}
              fullWidth
              label="Liste de Conditions"
              name="condition"
              value={formData.condition}
              //onChange={handleValuesChange}
              onChange={(e) => setFormData(f=>({...f, condition: e.target.value}))}
            />

            <TextField
              aria-label="minimum height"
              minRows={3}
              multiline
              fullWidth
              label="Aide utilisateur..."
              name="user_help"
              value={formData.user_help}
              //onChange={handleValuesChange}
              onChange={(e) => setFormData(f=>({...f, user_help: e.target.value}))}
            />

            {/* <StyledTextarea
              aria-label="minimum height"
              minRows={3}
              placeholder="Documents utils"
              name="help_documents"
              value={data.help_documents}
              onChange={handleValuesChange}
            /> */}

            
            <Box sx={{ width: "100%" }}>
              <Typography>
                Documents utils
              </Typography>
              <FilePicker onSelect={files=>setFormData(f=>({...f, help_documents: files}))}  />
              {/* <ChipSelect 
                onChange={(v)=>handleValuesChange({target:{name: "help_documents", value: v}})}  
                value={data.help_documents}
                initialValue={initial? initial.help_documents : undefined}  /> */}
            </Box>

            

            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Droit d'utilisateur
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  name="complexity_point"
                  value={formData.user_right??[]}
                  label="Droit d'utilisateur"
                 // onChange={handleRightsChange}
                 onChange={(e) => setFormData(f=>({...f, user_right: typeof e.target.value == typeof "" ? [e.target.value] : e.target.value}))}
                >
                  {(availableRights ?? []).map((right) => (
                    <MenuItem key={right} value={right}>
                      {right.toLocaleUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Button
            variant="outlined"
            sx={{ mt: 3, p: 1.5 }}
            fullWidth
            onClick={submitData}
          >
           Enregister
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateDataModal;
