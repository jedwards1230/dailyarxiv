import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import styles from './Calendar.module.css';

const CalendarComponent = () => {
    const { control } = useFormContext();

    return (
        <div className={styles.container}>
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
        </div>
    );
}

export default CalendarComponent;