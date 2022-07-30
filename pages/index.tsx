import type { NextPage } from 'next'
import { fetchArchive, queryToUrl, buildQuery } from '../scripts/apiTools'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '@mui/joy/Button';
import { useRouter } from 'next/router'
import { useAppContext } from './_app'
import CategoryFormField from '../components/categoryForm/categoryFormField'
import { ArxivCategories } from '../constants'
import { useThemeChecker } from '../scripts/theme'
import Title from '../components/title/title';
import { Box } from '@mui/joy';
import Section from '../components/section';
import CalendarComponent from '../components/calendar/calendar';

const Home: NextPage = () => {
	const appContext = useAppContext();
	const [mode, setMode] = useThemeChecker();
	const router = useRouter();

	//appContext.deleteConfig();

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
		<>
			<FormProvider {...methods}>
				<Section>
					<Title />
					<CalendarComponent />
				</Section>
				<Section>
					<Box
						sx={{
							mx: 0,
							width: { xs: '100%', sm: '80%', md: '60%', lg: '40%' },
							px: 1,
							py: 0.5,
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
		</>
	)
}

export default Home