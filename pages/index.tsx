import type { NextPage } from 'next'
import { fetchArchive, queryToUrl, buildQuery } from '../scripts/apiTools'
import styles from '../styles/Home.module.css'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAppContext } from './_app'
import CategoryFormField from '../components/categoryForm/categoryFormField'
import { ArxivCategories } from '../constants'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import { useThemeChecker } from '../scripts/theme'

type CategoryForm = {
	categories: ArchiveHeader[]
	datepicker: Date
}

const Home: NextPage = () => {
	const [mode, setMode] = useThemeChecker();
	const router = useRouter();
	const defaultValues = {
		categories: ArxivCategories,
		datepicker: new Date()
	}
	const methods = useForm<CategoryForm>({ defaultValues })
	const appContext = useAppContext();

	const onSubmit = async (data: CategoryForm) => {
		const query = buildQuery(data.categories);
		const url = queryToUrl(query, data.datepicker);
		const response = await fetchArchive(url);
		appContext.query = query;
		appContext.timePicked = data.datepicker;
		appContext.results = response as ArchiveResult[];
		await router.push('/results');
	}

	return (
		<div className={styles.container}>
			<FormProvider {...methods}>
				<div className={styles.welcome}>
					<h1 className={styles.title}>
						daily  <Link href="/">arXiv</Link>
					</h1>

					<p className={styles.description}>
						get started by choosing a date below
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