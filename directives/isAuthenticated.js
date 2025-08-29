import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver } from 'graphql'

export const authDirectiveTrasnformer = (schema) => {
	console.log('hiii')
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const authDireactive = getDirective(
				schema,
				fieldConfig,
				'isAuthenticated'
			);

			if (authDireactive) {
				const { resolve = defaultFieldResolver } = fieldConfig;
				const {role} = authDireactive[0]
				fieldConfig.resolve = async (parent, args, context, info) => {
					// throw new UserInputError('Not Authorized Region');

					const { authToken } = context;
					 
				};
			}
		},
	});
};


