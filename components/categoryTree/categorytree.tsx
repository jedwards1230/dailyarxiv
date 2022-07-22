import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Collapse, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ListCategoryHeading, ListCategoryItem, makeArxivDatabase } from '../../scripts/apiTools';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';

const CollapseCheckList = (props: {
    sections: ListCategoryItem[]
}) => {
    const { register } = useFormContext();
    const [open, setOpen] = React.useState(new Array(props.sections.length).fill(false));

    const handleClick = (i: number) => {
        const newState = [...open];
        newState[i] = !newState[i];
        setOpen(newState);
    };

    const buildTree = () => {
        return (
            props.sections.map((section, i) => {
                if (section.subareas) {
                    if (props.sections.length > 1) {
                        return (
                            <div key={section.code}>
                                <ListItemButton onClick={() => handleClick(i)}>
                                    <Checkbox
                                        edge="start"
                                        {...register(section.code)} />
                                    <ListItemText primary={section.name} />
                                    {open[i] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open[i]} timeout="auto" unmountOnExit>
                                    <List
                                        disablePadding
                                        sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        <ListItem sx={{ pl: 4 }}>
                                            <CollapseCheckList sections={section.subareas} />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </div>
                        )
                    } else {
                        return (
                            <CollapseCheckList key={section.code} sections={section.subareas} />
                        )
                    }
                } else {
                    return <CategoryNode key={section.code} node={section} />
                }
            })
        )
    }

    return (
        <List
            disablePadding
            sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {buildTree()}
        </List>
    )
}

const CategoryNode = (props: {
    node: ListCategoryItem;
}) => {
    const { register } = useFormContext();
    return (
        <>
            <ListItemButton>
                <Checkbox
                    edge="start"
                    {...register(props.node.code)} />
                <ListItemText primary={props.node.name} />
            </ListItemButton>
        </>
    )
}

export default CollapseCheckList;