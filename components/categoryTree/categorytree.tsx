import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';

const CollapseCheckList = (props: {
    sections: ArchiveHeader[]
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
                const code = section.code.split('.');
                const id = code.length > 1
                    ? code[0] + '.' + code[1]
                    : code[0];

                if (section.children) {
                    if (props.sections.length > 1) {
                        return (
                            <div key={section.code}>
                                <ListItemButton onClick={() => handleClick(i)}>
                                    <Checkbox
                                        edge="start"
                                        {...register(`catChoice.${id}`)} />
                                    <ListItemText primary={section.name} />
                                    {open[i] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open[i]} timeout="auto">
                                    <List
                                        disablePadding
                                        sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        <ListItem sx={{ pl: 4 }}>
                                            <CollapseCheckList sections={section.children!} />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </div>
                        )
                    } else {
                        return (
                            <CollapseCheckList key={section.code} sections={section.children!} />
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
    node: ArchiveHeader;
}) => {
    const { register } = useFormContext();
    const code = props.node.code.split('.');
    const id = code.length > 1
        ? code[0] + '.' + code[1]
        : code[0];
    return (
        <>
            <ListItemButton>
                <Checkbox
                    edge="start"
                    {...register(`catChoice.${id}`)} />
                <ListItemText primary={props.node.name} />
            </ListItemButton>
        </>
    )
}

export default CollapseCheckList;