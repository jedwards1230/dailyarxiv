import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useFormContext } from 'react-hook-form';

const CalendarComponent = () => {
    const { register } = useFormContext();
    const [value, onChange] = useState<Date>(new Date());

    return (
        <Calendar
            {...register('datepicker')}
            onChange={onChange}
            value={value}
            maxDate={new Date()} />
    );
}

export default CalendarComponent;