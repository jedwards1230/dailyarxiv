import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, Checkbox, ListItemText, Collapse, List, ListItem } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import { Controller } from 'react-hook-form';
import useCategoryFormField from './useCategoryFormField';

interface Props {
    prefix?: string;
}

const CategoryFormField: FunctionComponent<Props> = ({ prefix = '' }) => {
    const {
        fields,
        register,
        control,
        checkedInputPath: checkedInputPath
    } = useCategoryFormField(prefix);
    const [open, setOpen] = useState(new Array(fields.length).fill(false));

    const handleClick = (i: number) => {
        const newOpen = [...open];
        newOpen[i] = !newOpen[i];
        setOpen(newOpen);
    };

    return (
        <List
            disablePadding
            sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {fields.map((header: ArchiveHeader, index: number) => {
                const hasChildren = header.categories && header.categories.length > 0;
                
                console.log(checkedInputPath)
                console.log(header.desc)

                return (
                    <div key={header.code}>
                        <ListItemButton>
                            <Controller
                                name={checkedInputPath}
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        edge="start"
                                        onChange={(e) => field.onChange(e.target.checked)}
                                         />
                                )}
                            />
                            {/* <Checkbox
                                edge="start"
                                {...register(field.checked)} /> */}
                            <ListItemText primary={header.desc} />
                            {hasChildren &&
                                <div onClick={() => handleClick(index)}>
                                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                                </div>
                            }
                        </ListItemButton>
                        {hasChildren &&
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