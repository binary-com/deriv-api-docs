const path = require('path');
const fs = require('fs-extra');
const YAML = require('yaml');

const BASE_PATH = path.resolve(__dirname, '..', '..');
const DESTINATION_PATH = path.join(BASE_PATH, 'config/v3/');
const SOURCE_PATH = path.join(process.argv[2] || 'deriv-websockets-api', 'config/v3/');
const ALL_CONFIG_PATH = path.join(BASE_PATH, '_data/');

/*
 *  This function copies all the api schema files from the regentmarkets/binary-websocket-api/config/v3 folder to the binary-com/deriv-api-docs/config/v3 folder,
 *   whose hidden attribute is set to false.
 *  It also generates the v3.yml file in the binary-com/deriv-api-docs/_data folder, that lists all the api calls
 */
const generateApiList = async () => {
  console.log('Generating API list...');
  const methods = [];
  const yamlDocument = new YAML.Document();
  try {
    const filesAndFolders = await fs.promises.readdir(SOURCE_PATH, {
      withFileTypes: true,
    });
    const methodNames = filesAndFolders
      .filter((fileOrFolder) => fileOrFolder.isDirectory())
      .map((directory) => directory.name);
    for (const methodName of methodNames) {
      const sendJsonPath = path.join(SOURCE_PATH, methodName, '/send.json');
      const sendData = await fs.promises.readFile(sendJsonPath, 'utf8');
      const send = JSON.parse(sendData);
      if (!send.hidden) {
        const title = send.title.replace(/ \(request\)$/, '');
        methods.push({
          name: methodName,
          title: title.toString(),
        });
        await fs.copy(path.join(SOURCE_PATH, methodName), path.join(DESTINATION_PATH, methodName));
      }
    }

    yamlDocument.contents = {
      groups: {
        label: 'All Calls',
        methods: methods,
      },
    };

    await fs.promises.writeFile(path.join(ALL_CONFIG_PATH, '/v3.yml'), yamlDocument.toString());
  } catch (error) {
    logToFile(error);
  }
};

const logToFile = async (message) => {
  const date = new Date();
  const logFileName = `logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-logs.txt`;
  try {
    await fs.appendFile(logFileName, message);
  } catch (error) {
    console.error(error);
  }
};

generateApiList();
