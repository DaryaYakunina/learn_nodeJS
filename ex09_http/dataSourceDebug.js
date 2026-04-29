import DataSource from "./dataSource.js";


try {
    const ds = new DataSource('db/database.json');

    // ds.create({
    //     name: 'Война и мир',
    //     author: 'Лев Толстой',
    //     description: 'том 3'
    // });
    // ds.debug(); 

    // ds.delete(11);

    const oneBefore = ds.getOne(1);
    console.log('ONE_BEFORE: ', oneBefore);

    ds.update(1, {description: 'Том 1-4'});

    const oneAfter = ds.getOne(1);
    console.log('ONE_AFTER: ', oneAfter);

    // const all = ds.getAll();
    // console.log('ALL: ', all);

} catch (e) {
    console.error('Error detected: ', e);
}