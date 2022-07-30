import Sheet from "@mui/joy/Sheet"

const Section = (props: { children: React.ReactNode }) => {
	return (
		<Sheet sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100%',
			my: 2,
			minHeight: '100%',
		}}>
			{props.children}
		</Sheet>
	)
}

export default Section