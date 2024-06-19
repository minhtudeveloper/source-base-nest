declare var process: {
  cwd(): string;
  env: {
    NODE_ENV: 'development' | 'staging' | 'production';
    PORT: number;
    API_PREFIX: string;
    FE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    LDAP_ENABLED: string;
    LDAP_SERVER: string;
    LDAP_DOMAIN: string;
    LDAP_DOMAIN_EMAIL: string;
    DB_TYPE:
      | 'mysql'
      | 'postgres'
      | 'cockroachdb'
      | 'sap'
      | 'mariadb'
      | 'sqlite'
      | 'cordova'
      | 'react-native'
      | 'nativescript'
      | 'sqljs'
      | 'oracle'
      | 'mssql'
      | 'mongodb'
      | 'aurora-mysql'
      | 'aurora-postgres'
      | 'expo'
      | 'better-sqlite3'
      | 'capacitor'
      | 'spanner';
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    JOB_REMOVE_FILE: string;
  };
};
