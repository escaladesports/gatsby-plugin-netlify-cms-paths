const { join } = require(`path`)
const readYaml = require(`read-yaml-promise`)

const cwd = process.cwd()
let obj

module.exports = async function({ cmsConfig = `/static/admin/config.yml` }){
	if(obj) return obj
	const configPath = join(cwd, cmsConfig)
	let { media_folder, public_folder } = await readYaml(configPath)
	if(!media_folder ){
		console.error(`Missing media_folder in Netlify CMS config`)
		process.exit(1)
	}
	if(!public_folder ){
		console.error(`Missing public_folder in Netlify CMS config`)
		process.exit(1)
	}
	obj = {
		mediaPath: media_folder,
		publicPath: public_folder,
	}
	return obj
}
