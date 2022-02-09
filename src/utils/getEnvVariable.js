function getEnvVariable(envName, defaultValue) {
  const envVariable = process.env[envName];
  return envVariable || defaultValue;
}

export default getEnvVariable;
