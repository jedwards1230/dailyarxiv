import type { NextPage } from 'next'
import { fetchArchive, queryToUrl, buildQuery } from '../scripts/apiTools'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAppContext } from './_app'
import CategoryFormField from '../components/categoryForm/categoryFormField'
import { ArxivCategories } from '../constants'
import { useThemeChecker } from '../scripts/theme'
import Title from '../components/title/title';
import CalendarComponent from '../components/calendar/calendar';
import styles from '../styles/Home.module.css';

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
				<div className={styles.section}>
					<Title />
					<CalendarComponent />
				</div>
				<div className={styles.section}>
					<div className={styles.categoryTree}>
						<CategoryFormField />
					</div>
					<button
						className={styles.submitButton}
						onClick={methods.handleSubmit(onSubmit)}>Search</button>
				</div>
			</FormProvider>
		</>
	)
}

export default Home