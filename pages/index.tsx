import type { NextPage } from 'next'
import { fetchArchive, queryToUrl, buildQuery } from '../scripts/apiTools'
import styles from '../styles/Home.module.css'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import { useRouter } from 'next/router'
import { useAppContext } from './_app'
import CategoryFormField from '../components/categoryForm/categoryFormField'
import { ArxivCategories } from '../constants'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import { useThemeChecker } from '../scripts/theme'
import Title from '../components/title/title';

const Home: NextPage = () => {
	const appContext = useAppContext();
	const [mode, setMode] = useThemeChecker();
	const router = useRouter();

	const storedConfig = appContext.loadConfig();
	const defaultValues: CategoryForm = storedConfig
		? storedConfig
		: {
			categories: ArxivCategories,
			datepicker: new Date()
		}
	const methods = useForm<CategoryForm>({ defaultValues })

	const onSubmit = async (data: CategoryForm) => {
		// process form data
		appContext.saveConfig(data.categories, data.datepicker);
		const query = buildQuery(data.categories);
		const url = queryToUrl(query, data.datepicker);
		const response = await fetchArchive(url);

		// handle api response
		appContext.query = query;
		appContext.timePicked = data.datepicker;
		appContext.results = response as ArchiveResult[];
		await router.push('/results');
	}

	return (
		<div className={styles.container}>
			<FormProvider {...methods}>
				<div className={styles.welcome}>
					<Title />

					<p className={styles.description}>
						Get started by choosing a date below
					</p>

					{/* <CalendarComponent /> */}
					<StaticDatePickerDemo />
				</div>

				<div className={styles.categoryTree}>
					<CategoryFormField />
					<Button
						color="primary"
						style={{ marginTop: '3rem' }}
						onClick={methods.handleSubmit(onSubmit)}
						variant="solid">Search</Button>
				</div>
			</FormProvider>
		</div>
	)
}

function StaticDatePickerDemo() {
	const { control } = useFormContext();

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Controller
				name={'datepicker'}
				control={control}
				render={({ field }) => (
					<StaticDatePicker
						disableFuture
						displayStaticWrapperAs="desktop"
						openTo="day"
						value={field.value}
						onChange={(newValue: any) => {
							field.onChange(newValue);
						}}
						renderInput={(params: any) => <TextField {...params} />}
					/>
				)}
			/>

		</LocalizationProvider>
	);
}

export default Home