import { Box } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form'
import TextField from '@mui/material/TextField';

const CalendarComponent = () => {
    const { control } = useFormContext();

    return (
        <Box
            sx={{
                mx: 0,
                padding: 1,
            }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                    name={'datepicker'}
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            disableFuture
                            openTo="day"
                            views={['year', 'month', 'day']}
                            value={field.value}
                            onChange={(newValue: any) => field.onChange(newValue)}
                            renderInput={(params: any) => <TextField {...params} />}
                        />
                    )}
                />
            </LocalizationProvider>
        </Box>
    );
}

export default CalendarComponent;