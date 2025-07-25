import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714026572287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DO $$
    BEGIN
        CREATE TABLE IF NOT EXISTS "company_has_user_component_filter"(
        id SERIAL PRIMARY KEY,
        company_has_user_id INTEGER REFERENCES "company_has_user" NOT NULL,
		created BIGINT,
        component_name VARCHAR(256),
		component_value TEXT,
		component_type VARCHAR(256),
        CONSTRAINT unique_constraint UNIQUE (company_has_user_id, component_name, component_type)
        );
    END $$;

    DO $$
    DECLARE
        ct text;
    /* ------------------------------------------------------------------------------------
    SCRIPT: for set_created_date & set_modified_date
    DESCRIPTION 	  : Set both triggers to all the tables of current database
    CREATED BY 	  : Sakshi Antala
    CREATED DATE	  : 25-April-2025
    MODIFIED BY	  : Sakshi Antala
    MODIFIED DATE  : 25-April-2025
    ------------------------------------------------------------------------------------*/
    BEGIN
        FOR ct IN 
        SELECT c.table_name FROM information_schema.columns c
        LEFT JOIN information_schema.tables t ON t.table_name = c.table_name
        WHERE c.column_name = 'created' AND c.table_schema != 'information_schema' AND t.table_type != 'VIEW'
        LOOP
            EXECUTE format('DROP TRIGGER IF EXISTS set_created on %I',ct);
            EXECUTE format('CREATE TRIGGER set_created
                            BEFORE INSERT ON %I
                            FOR EACH ROW EXECUTE PROCEDURE set_created()',
                            ct);
    END LOOP;    
    END;
    $$ LANGUAGE plpgsql
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DO $$
    BEGIN
        DROP TABLE IF EXISTS "company_has_user_component_filter";
    END $$;
    `);
  }
}
