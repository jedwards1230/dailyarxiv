import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { List, ListItemButton, ListItemText, Collapse, ListItem, Checkbox } from "@mui/material";
import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import CollapseCheckList from "./categorytree";


const CategoryForm = (props: {
    idx: number;
    section: ArchiveHeader;
}) => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "catChoice"
    });

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItemButton
                onClick={handleClick}>
                <Checkbox
                    edge="start"
                    {...register(`categories[${props.idx}].checked`)} />
                <ListItemText primary={props.section.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <List 
                    disablePadding
                    sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem sx={{ pl: 4 }}>
                        <CollapseCheckList
                            sections={props.section.children!} />
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}

export default CategoryForm;