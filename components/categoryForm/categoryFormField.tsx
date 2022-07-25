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
        control,
        categoryArrayInputPath: categoryArrayInputPath,
    } = useCategoryFormField(prefix);

    const [open, setOpen] = useState(new Array(fields.length).fill(false));
    const [initialOpen, setInitialOpen] = useState(true);

    const handleClick = (i: number) => {
        const newOpen = [...open];
        newOpen[i] = !newOpen[i];
        setOpen(newOpen);
    };

    useEffect(() => {
        setInitialOpen(false);
    }, []);

    return (
        <List
            disablePadding
            sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {fields.map((header, index) => {
                const code: string[] = header.code.split('.');
                const hasChildren = header.categories && header.categories.length > 0;
                const fieldId = categoryArrayInputPath + `[${index}].checked` as 'checked';

                return (
                    <div key={header.code}>
                        <ListItemButton>
                            <Controller
                                name={fieldId}
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Checkbox
                                            edge="start"
                                            onChange={(e) => field.onChange(e.target.checked)}
                                            checked={field.value}
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
                        {(hasChildren && !initialOpen) &&
                            <Collapse in={open[index]} timeout="auto">
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