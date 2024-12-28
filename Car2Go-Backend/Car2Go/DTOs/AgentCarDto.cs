﻿using System.ComponentModel.DataAnnotations;

namespace Car2Go.DTOs
{
    public class AgentCarDto
    {
        [Required(ErrorMessage = "Make is required")]
        public string Make { get; set; }

        [Required(ErrorMessage = "Model required")]
        public string Model { get; set; }

        [Required(ErrorMessage = "Year required")]
        public int year { get; set; }

        [Required(ErrorMessage = "Color required")]
        public string Colour { get; set; }

        [Required(ErrorMessage = "Car Seats required")]
        [Range(5, 7)]
        public int TotalSeats { get; set; }

        [Required(ErrorMessage = "License Plate required")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "License Number should be exactly 10 characters long")]
        public string LicensePlate { get; set; }

        [Required(ErrorMessage = "Price required")]
        public decimal PricePerDay { get; set; }


        [Required]
        public bool AvailableStatus { get; set; }

        [Required]
        [DataType(DataType.Date)]

        public DateOnly AvailableDate { get; set; }

        public string imageUrl { get; set; }

        public int LocationId { get; set; }
    }
}
