import { executeAgentTool } from './tools'

export async function executeActions(actions: Array<{ id: string; tool: string; args: any }>) {
	const results = []
	for (const action of actions) {
		const { id, tool, args } = action
		const result = await executeAgentTool(tool, args)
		results.push({ id, tool, result })
	}
	return results.length === 1 ? results[0].result : results
}
