import sequelize from '../config/db';
import { initModels } from './init-models';


// Initialize all models
const models = initModels(sequelize);

// Export the initialized models and sequelize instance
export { sequelize };
export default models;