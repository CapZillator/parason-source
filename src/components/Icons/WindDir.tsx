import React from 'react';

function WindDir(props: any) {
    //Возвращает изображение анимированных ветряков, скорость вращения которых зависит от показателей шкалы Бофорта
    const direction = props.direction;
    let windDirClassName;
    let mainIconClass = props.type === 'forecast' ? 'Wind-dir-icon-forecast': 'Wind-dir-icon'; 
    switch(direction){
        case 1: windDirClassName = "Wind-dir-NE"; break;
        case 2: windDirClassName = "Wind-dir-E"; break;
        case 3: windDirClassName = "Wind-dir-SE"; break;
        case 4: windDirClassName = "Wind-dir-S"; break;
        case 5: windDirClassName = "Wind-dir-SW"; break;
        case 6: windDirClassName = "Wind-dir-W"; break;
        case 7: windDirClassName = "Wind-dir-NW"; break;
        default: windDirClassName = "Wind-dir-N"; break;
    }
    return (
        <div>
            <svg width="100" height="100" viewBox="0 0 26.458 26.458" className={`${mainIconClass} ${windDirClassName}`}>
                <path className="Wind-dir-path" transform="scale(.26458)" d="m48.818 10.012c-0.88981-0.010465-1.7857 0.45566-2.3633 1.4023-0.27725 0.45441-3.6909 10.664-8.9004 26.619-4.6478 14.235-10.068 30.833-12.045 36.887-1.9768 6.0532-3.6616 11.371-3.7461 11.816-0.2477 1.3061 0.2365 2.5927 1.1562 3.0684 0.62565 0.32349 1.7614 0.29783 2.4473-0.054688 0.31185-0.16029 5.5653-4.2191 11.674-9.0215 10.854-8.5334 11.122-8.7324 11.828-8.7324 0.39724 0 0.81741 0.056729 0.93359 0.12695 0.11616 0.070235 5.5561 3.965 12.088 8.6543s12.272 8.7284 12.758 8.9766c1.0224 0.52248 1.6751 0.56769 2.4629 0.16602 1.0914-0.55649 1.6072-1.8025 1.3047-3.1523-0.090924-0.40575-0.81637-2.5444-1.6133-4.752-16.294-45.135-25.334-69.997-25.652-70.545-0.55733-0.96003-1.4422-1.4485-2.332-1.459zm-0.82812 11.439c0.33794 0.003976 0.98047 0.24534 0.98047 1.2148 0.003402 6.4156-0.029297 38.527-0.029297 42.727-0.062131 2.4746-1.6579 3.6023-9.957 10.127-4.6705 3.6719-8.6854 6.7759-8.9238 6.8984-0.52441 0.26952-1.3927 0.2903-1.8711 0.042969-0.70323-0.36366-1.0742-1.349-0.88476-2.3477 0.06463-0.34058 1.3538-4.4049 2.8652-9.0332 1.5115-4.6283 5.6553-17.321 9.209-28.205 3.9832-12.199 6.5927-20.004 6.8047-20.352 0.44163-0.72383 1.1263-1.0803 1.8066-1.0723z" strokeWidth="0.16381"/>
            </svg>
        </div>
    );
  }
  export default WindDir;