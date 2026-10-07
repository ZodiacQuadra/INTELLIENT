import fs from 'fs';

async function setupLogos() {
  // 1. Azure Modern Icon
  const azureRes = await fetch('https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg');
  let azureSvg = await azureRes.text();
  azureSvg = azureSvg.replace('<svg ', '<svg fill="#ffffff" ');
  fs.writeFileSync('public/logos/azure-icon.svg', azureSvg);

  // 2. Snowflake Icon
  const sfRes = await fetch('https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/snowflake.svg');
  let sfSvg = await sfRes.text();
  sfSvg = sfSvg.replace('<svg ', '<svg fill="#29B5E8" ');
  fs.writeFileSync('public/logos/snowflake.svg', sfSvg);

  // 3. Apache Kafka Icon
  const kafkaRes = await fetch('https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apachekafka.svg');
  let kafkaSvg = await kafkaRes.text();
  kafkaSvg = kafkaSvg.replace('<svg ', '<svg fill="#ffffff" ');
  fs.writeFileSync('public/logos/kafka.svg', kafkaSvg);

  // 4. AWS Icon (alternative option)
  const awsRes = await fetch('https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg');
  let awsSvg = await awsRes.text();
  awsSvg = awsSvg.replace('<svg ', '<svg fill="#FF9900" ');
  fs.writeFileSync('public/logos/aws.svg', awsSvg);

  console.log('Logos successfully downloaded and saved');
}

setupLogos().catch(console.error);
