import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box, TextField } from '@mui/material';
import { Delete, FileOpen, Visibility } from '@mui/icons-material';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type Props = {
    initialValue?: string
    value: string
    onChange?: (value: string)=>void
}

export default function ChipsArray(props: Props) {

  const {onChange, initialValue, value} = props
  const [chipData, setChipData] = React.useState<string[]>(initialValue ? initialValue.split(";") : []);

  const [text, setText] = React.useState("")

  const handleDelete = (idx: number) => () => {
    setChipData((chips) => {
        const new_array = []
        for (let i=0; i<chips.length; i++){
            if (i != idx){
                new_array.push(chips[i])
            }
        }
        return new_array
    })
  };

  // const handleChange = (choices: string[]) => () => {
    
  // };

  React.useEffect(()=>{
    if (value != chipData.join(";")){

      setChipData(value.split(";"))
    }
  }, [value])



  React.useEffect(()=>{
    if (onChange && (value != chipData.join(";"))){
      onChange(chipData.join(";"))
    }
  }, [chipData])



  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
        <TextField fullWidth
         aria-label="minimum height"
         minRows={3}
         label="Liens documents utils (Entrée pour ajouter)"
         name="help_documents"
         value={text}
         onKeyDown={(e)=>{
            if (e.key === "Enter" && text!==""){
                setChipData(chips => {
                  if (!chips.includes(text)){
                    return [...chips, text]
                  }
                  return chips
                })
                setText("")
            }
         }}
         //value={data.help_documents}
         onChange={(e)=>setText(e.target.value)} 
        />
      {chipData.map((data, idx) => {
        return (
            
                <ListItem key={idx}>
                <Chip
                    clickable
                    icon={<a href={data} target='_blank'><Visibility sx={{marginTop: 0.5}} /></a>}
                    label={data}
                    //deleteIcon={<Delete onClick={(e)=>{e.stopPropagation()}}  />}
                    onDelete={handleDelete(idx)}
                    
                />
            </ListItem>
            
          
        );
      })}
    </Paper>
  );
}