import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, Checkbox, ListItemText, Collapse, List, ListItem } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import useCategoryFormField from './useCategoryFormField';

interface Props {
    prefix?: string;
}

const CategoryFormField: FunctionComponent<Props> = ({ prefix = '' }) => {
    const {
        fields,
        watch,
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
        // * watch() is tagged to return any[], but this returns a single object. need to ignore error and it works fine.
        // @ts-ignore: Unreachable code error
        const entry = watch(`${prefix}categories.${index}` as "categories") as ArchiveHeader;

        return (!entry.categories!.every((child) => child.checked) && !entry.categories!.every((child) => !child.checked))
    }

    return (
        <List
            disablePadding
            sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {fields.map((header: ArchiveHeader, index) => {
                const hasChildren = header.categories && header.categories.length > 0;
                const fieldId = categoryArrayInputPath + `[${index}].checked` as 'checked';
                const indeterminate = hasChildren ? checkIndeterminate(index) : false;

                return (
                    <div key={header.code}>
                        <ListItemButton>
                            <Controller
                                name={fieldId}
                                control={control}
                                render={({ field }) => {
                                    const value = hasChildren
                                        ? header.categories!.every((child: ArchiveHeader) => child.checked)
                                        : field.value
                                    return (
                                        <Checkbox
                                            edge="start"
                                            onChange={(e) => field.onChange(e.target.checked)}
                                            checked={field.value}
                                            indeterminate={indeterminate}
                                        />
                                    )
                                }}
                            />
                            <ListItemText primary={header.desc} />
                            {hasChildren &&
                                <div onClick={() => handleClick(index)}>
                                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                                </div>
                            }
                        </ListItemButton>
                        {hasChildren &&
                            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                <List
                                    disablePadding
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    <ListItem sx={{ pl: 4 }}>
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