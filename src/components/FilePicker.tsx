import React from 'react'
import { MuiFileInput } from 'mui-file-input'
import { Chip, Stack } from '@mui/material'

type Props = {
    label?: string
    single?: boolean,
    items?: any[],
    onSelect?: (files: File[]) => void
}
const FilePicker = (props: Props) => {
  const [value, setValue] = React.useState<File[]>([...(props.items ?? [])])

  const handleChange = (newValue: File[]) => {
    
    if (newValue.length == 0){
        setValue([])
        if (props.onSelect){
            props.onSelect([])
        }
        return
    }
    if (props.single){
        setValue([newValue[0]])
        if (props.onSelect){
            props.onSelect([newValue[0]])
        }
        
        return
    }
    if (props.onSelect){
        props.onSelect([...value, ...newValue])
    }
    setValue(old => [...old, ...newValue])
    
  }

  const handleDelete = (idx: number) => {
    const new_array = []
    for (let i=0; i<value.length; i++){
        if (i!=idx) {
            new_array.push(value[i])
        }
    }
    setValue(new_array)
  };

  return (
    <Stack direction="column" spacing={1}  width={'100%'}  flex={1}>

        <MuiFileInput
          style={{ height: '100%'}}
          label={props.label}
          multiple
          value={value}
          onChange={handleChange}
          getInputText={v=>`${v.length} Fichier`+`${v.length > 1 ? "s": ""}`}
          //inputProps={{style:{height: '100%'}}}
          //hideSizeText
        />
        <Stack  direction={"row"} gap={1}   flexWrap={'wrap'}>
        {value.length > 1 ? 

        value.map((item, idx) => {
            return (
                <Chip size='small' key={idx} label={`${item.name}`} onDelete={e => handleDelete(idx)} />
            )
        })
         : null}
         </Stack>
    </Stack>
  )
}


export default FilePicker