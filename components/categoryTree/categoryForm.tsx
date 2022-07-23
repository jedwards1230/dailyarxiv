import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { List, ListItemButton, ListItemText, Collapse, ListItem, Checkbox } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import CollapseCheckList from "./categorytree";

const CategoryForm = (props: {
    idx: number;
    section: ListCategoryHeading;
}) => {
    const { register } = useFormContext();
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
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List 
                    disablePadding
                    sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem sx={{ pl: 4 }}>
                        <CollapseCheckList
                            sections={props.section.areas} />
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}

export default CategoryForm;