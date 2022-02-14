function getEnvVariable(envName, defaultValue) {
  // eslint-disable-next-line no-undef
  const envVariable = process.env[envName];
  return envVariable || defaultValue;
}

export default getEnvVariable;
