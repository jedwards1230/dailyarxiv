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
import { Box } from '@mui/joy';
import Section from '../components/section';

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
				<Section>
					<Title />

					<p className={styles.description}>
						Get started by choosing a date below
					</p>

					<StaticDatePickerDemo />
				</Section>

				<Section>
					<Box
						sx={{
							mx: 0,
							width: '100%',
							px: 1,
							py: 0.5,
							/* borderRadius: '2%',
							border: { xs: 0, sm: 1},
							borderColor: 'primary.main', */
							//boxShadow: 1,
						}}>
						<CategoryFormField />
					</Box>
					<Button
						color="primary"
						style={{ margin: '2rem 0' }}
						onClick={methods.handleSubmit(onSubmit)}
						variant="solid">Search</Button>
				</Section>
			</FormProvider>
		</div>
	)
}

function StaticDatePickerDemo() {
	const { control } = useFormContext();

	return (
		<Box
			sx={{
				mx: 0,
				padding: 1,
				/* borderRadius: '2%',
				border: { xs: 0, sm: 1},
				boxShadow: 1, */
			}}>
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
		</Box>
	);
}

export default Home