import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Step } from '../../types/types';
import { useBesoinState } from '../../store/besoin_store';
interface Props extends ListChildComponentProps {
  data: Step[]
}
function RenderRow(props: Props) {
  const { index, style } = props;
  const {active_step, set_active_step} = useBesoinState()

  return (
    <ListItem  style={style} key={index} component="div" disablePadding >
      <ListItemButton   selected={props.data[index].id == active_step} onClick={()=>set_active_step(props.data[index].id)}>
        <ListItemText  primary={`${props.data[index].id_code}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList(
    {
        height, width, maxWidth, data
    }:
    {
        height?:number|string, width?: number | string, maxWidth?: number, data?: Step[]
    }) {
        const boxRef = React.useRef<HTMLDivElement>(null)
       
  return (
    <Box ref={boxRef}
      sx={{ width:width ?? '100%', height: height, maxWidth: maxWidth ?? 360, bgcolor: 'background.paper' }}
    >

      <FixedSizeList
        
        itemData={data}
        height={height ?? 400}
        width={maxWidth ?? 360}
        itemSize={46}
        itemCount={ data?.length ?? 200}
        overscanCount={5}
      >
        {RenderRow}
      </FixedSizeList>
    </Box>
  );
}