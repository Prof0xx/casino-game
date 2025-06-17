let mysql = require('mysql')

// Mock data for testing without database
const mockUsers = [
    {
        id: 1,
        user: 'testuser',
        email: 'test@example.com',
        pass: '{"encrypted":"test123"}', // This would normally be encrypted
        account_type: 1,
        money: 1000,
        profile_pic: 1
    }
]

const mockLogin = []

module.exports = function database(database_config, params){
    // Test mode - return mock data instead of connecting to real database
    if (process.env.NODE_ENV === 'development' && !process.env.DB_HOST) {
        return new Promise((resolve) => {
            console.log('🧪 Test Mode: Using mock database data')
            
            // Simulate different database operations based on SQL
            if (database_config.sql.includes('SELECT * FROM casino_user') && database_config.sql.includes('SELECT * FROM login_user')) {
                // Sign-in query - return both users and login data
                resolve([mockUsers, mockLogin])
            } else if (database_config.sql.includes('SELECT * FROM casino_user WHERE email')) {
                // Sign-up query - return empty for new user
                resolve([])
            } else if (database_config.sql.includes('SELECT * FROM casino_user')) {
                // General user query
                resolve(mockUsers)
            } else {
                // Any other query - return success
                resolve({ insertId: 1, affectedRows: 1 })
            }
        })
    }

    // Real database connection (original code)
    let con = mysql.createConnection({
		host: database_config.host,
		user: database_config.user,
		password: database_config.password,
		database: database_config.database,
		multipleStatements: true
	});
	let sql_result = "hello friend!"

    return new Promise((resolve, reject)=>{
        try{
            con.connect((err)=>{
				if (err) {
                    console.error('Database connection error:', err)
                    console.log('💡 Tip: For testing wallet integration, remove DB_HOST from .env.development')
					resolve(null)
				} else {
                    if(params){
                        con.query(database_config.sql, params, (err, result, fields)=>{
                            if (err) {
                                console.error('Database query error:', err)
					            resolve(null)
                            } else {
                                resolve(result)
                                con.end()
                            }
                        })
                    } else {
                        con.query(database_config.sql, (err, result, fields)=>{
                            if (err) {
                                console.error('Database query error:', err, database_config.sql)
					            resolve(null)
                            } else {
                                resolve(result)
                                con.end()
                            } 
                        })
                    }	
                }
            })
        } catch(err){
			console.error('Database connection failed:', err)
            console.log('💡 Tip: For testing wallet integration, remove DB_HOST from .env.development')
            resolve(null)
		}
    })
}