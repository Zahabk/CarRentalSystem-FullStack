﻿using Car2Go.DTOs;

namespace Car2Go.Services
{
    public interface ICarService
    {
        //public List<CarWithImageDto> GetCars();
        public List<CarWithRatingsDto> GetCarsWithRating();

        public CarDto CreateCar(CreateCarDto carDto, string email);
        public bool UpdateCar(UpdateCarDto car,string licenseplate);
        public bool UpdateCarWithLocation(CarWithLocationDto carWithLocationDto, string licenseplate);
        public bool DeleteCar(string licenseplate);
        public List<CarWithRatingsDto> GetCars(string email);

    }
}
