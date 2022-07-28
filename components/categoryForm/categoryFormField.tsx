import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import React, { FunctionComponent, useState } from 'react';
import { Controller } from 'react-hook-form';
import useCategoryFormField from './useCategoryFormField';
import ListItemButton from '@mui/joy/ListItemButton';
import { Sheet } from '@mui/joy';

interface Props {
    prefix?: string;
}

const CategoryFormField: FunctionComponent<Props> = ({ prefix = '' }) => {
    const {
        fields,
        watch,
        update,
        control,
        categoryArrayInputPath: categoryArrayInputPath,
    } = useCategoryFormField(prefix);

    const [open, setOpen] = useState(new Array(fields.length).fill(false));

    const handleClick = (i: number) => {
        const newOpen = [...open];
        newOpen[i] = !newOpen[i];
        setOpen(newOpen);
    };

    const checkIndeterminate = (index: number) => {
        // @ts-ignore: Unreachable code error
        const entry = watch(`${prefix}categories.${index}` as "categories") as ArchiveHeader;
        return (!entry.categories!.every((child) => child.checked) && !entry.categories!.every((child) => !child.checked))
    }

    const updateChildren = (index: number, checked: boolean) => {
        // @ts-ignore: Unreachable code error
        const entry = watch(`${prefix}categories.${index}` as "categories") as ArchiveHeader;
        entry.categories = entry.categories!.map((child) => {
            return {
                ...child,
                checked: checked
            }
        })
        update(index, entry);
    }

    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
            }}>
            {fields.map((header: ArchiveHeader, index) => {
                const hasChildren = header.categories && header.categories.length > 0;
                const fieldId = categoryArrayInputPath + `[${index}].checked` as 'checked';
                const indeterminate = hasChildren ? checkIndeterminate(index) : false;

                return (
                    <div key={header.id}>
                        <ListItemButton>
                            <Controller
                                name={fieldId}
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        color="primary"
                                        variant="soft"
                                        onChange={(e) => {
                                            if (hasChildren) updateChildren(index, e.target.checked)
                                            return field.onChange(e.target.checked)
                                        }}
                                        checked={indeterminate || field.value}
                                        indeterminate={indeterminate}
                                    />
                                )}
                            />
                            <ListItem sx={{ width: "100%" }}>{header.desc}</ListItem>
                            {hasChildren &&
                                <div onClick={() => handleClick(index)}>
                                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                                </div>
                            }
                        </ListItemButton>
                        {hasChildren &&
                            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                <List
                                    sx={{
                                        bgcolor: 'background.paper',
                                        "--List-padding": "0px",
                                    }}>
                                    <ListItem nested sx={{ pl: 4 }} >
                                        <CategoryFormField prefix={`${prefix}categories.${index}.`} />
                                    </ListItem>
                                </List>
                            </Collapse>
                        }
                    </div>
                )
            })}
        </List>
    );
};

export default CategoryFormField;